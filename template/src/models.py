"""Model definitions. Kept intentionally small.

`SimpleCNN` is the reference architecture used throughout Bab 01-03 with
CIFAR-10. The additional architectures (`SimpleMLP`, `SimpleLSTM`,
`TransformerMini`, `SimpleAutoencoder`) back the breadth labs (1c, 3b, 6b,
7b) that extend coverage to MLP, sequence, attention, and representation
learning respectively. Each is deliberately small so students can trace
every tensor shape without a debugger.
"""

from __future__ import annotations

import math
from typing import Any

import torch
import torch.nn as nn


class SimpleCNN(nn.Module):
    """A two-block CNN for 32x32 RGB inputs.

    Blocks are named to support surgical freezing:
    - `block1`: first conv stage (low-level features)
    - `block2`: second conv stage (mid-level features)
    - `classifier`: global pool + linear head
    """

    def __init__(self, num_classes: int = 10):
        super().__init__()
        self.block1 = nn.Sequential(
            nn.Conv2d(3, 32, kernel_size=3, padding=1, bias=False),
            nn.BatchNorm2d(32),
            nn.ReLU(inplace=True),
            nn.Conv2d(32, 64, kernel_size=3, padding=1, bias=False),
            nn.BatchNorm2d(64),
            nn.ReLU(inplace=True),
            nn.MaxPool2d(2),
        )
        self.block2 = nn.Sequential(
            nn.Conv2d(64, 128, kernel_size=3, padding=1, bias=False),
            nn.BatchNorm2d(128),
            nn.ReLU(inplace=True),
            nn.Conv2d(128, 128, kernel_size=3, padding=1, bias=False),
            nn.BatchNorm2d(128),
            nn.ReLU(inplace=True),
            nn.MaxPool2d(2),
        )
        self.classifier = nn.Sequential(
            nn.AdaptiveAvgPool2d(1),
            nn.Flatten(),
            nn.Dropout(0.3),
            nn.Linear(128, num_classes),
        )

    def forward(self, x: torch.Tensor) -> torch.Tensor:
        x = self.block1(x)
        x = self.block2(x)
        return self.classifier(x)


class SimpleMLP(nn.Module):
    """Multi-layer perceptron for flattened inputs (tabular, MNIST).

    Forward pass matches the derivation in Bab 01 Section 2.0b: each block
    is Linear → activation → optional dropout. Used by Lab W1 as the
    library-side reference after the numpy-from-scratch exercise.
    """

    def __init__(
        self,
        input_dim: int = 784,
        hidden_sizes: tuple[int, ...] = (256, 128),
        num_classes: int = 10,
        dropout: float = 0.0,
        activation: str = "relu",
    ):
        super().__init__()
        act_cls = {"relu": nn.ReLU, "gelu": nn.GELU, "silu": nn.SiLU}[activation.lower()]
        layers: list[nn.Module] = []
        prev = input_dim
        for h in hidden_sizes:
            layers.append(nn.Linear(prev, h))
            layers.append(act_cls())
            if dropout > 0:
                layers.append(nn.Dropout(dropout))
            prev = h
        layers.append(nn.Linear(prev, num_classes))
        self.net = nn.Sequential(*layers)

    def forward(self, x: torch.Tensor) -> torch.Tensor:
        if x.ndim > 2:
            x = x.flatten(start_dim=1)
        return self.net(x)


class SimpleLSTM(nn.Module):
    """LSTM-based sequence model for (B, T, F) inputs.

    Supports two readout modes:
    - "last": use hidden state at the final timestep (classification)
    - "all": return prediction per timestep (forecasting/tagging)

    Used by Lab W5 for synthetic sine-wave one-step-ahead prediction and
    optionally for character-level language modeling.
    """

    def __init__(
        self,
        input_size: int = 1,
        hidden_size: int = 64,
        num_layers: int = 1,
        num_classes: int = 1,
        dropout: float = 0.0,
        readout: str = "last",
    ):
        super().__init__()
        assert readout in ("last", "all")
        self.readout = readout
        self.lstm = nn.LSTM(
            input_size=input_size,
            hidden_size=hidden_size,
            num_layers=num_layers,
            batch_first=True,
            dropout=dropout if num_layers > 1 else 0.0,
        )
        self.head = nn.Linear(hidden_size, num_classes)

    def forward(self, x: torch.Tensor) -> torch.Tensor:
        out, _ = self.lstm(x)
        if self.readout == "last":
            out = out[:, -1, :]
        return self.head(out)


class _PositionalEncoding(nn.Module):
    """Standard sinusoidal positional encoding. Fixed, not learned."""

    def __init__(self, d_model: int, max_len: int = 512):
        super().__init__()
        pe = torch.zeros(max_len, d_model)
        position = torch.arange(0, max_len, dtype=torch.float).unsqueeze(1)
        div_term = torch.exp(
            torch.arange(0, d_model, 2, dtype=torch.float) * (-math.log(10000.0) / d_model)
        )
        pe[:, 0::2] = torch.sin(position * div_term)
        pe[:, 1::2] = torch.cos(position * div_term)
        self.register_buffer("pe", pe.unsqueeze(0))

    def forward(self, x: torch.Tensor) -> torch.Tensor:
        return x + self.pe[:, : x.size(1)]


class TransformerMini(nn.Module):
    """Encoder-only Transformer for short sequence classification.

    Lab W7 first builds scaled dot-product attention by hand; this class is
    the PyTorch reference implementation used as the sanity check at the
    end of the notebook. Keeps `d_model` small so students can trace shapes
    on a CPU-only machine.
    """

    def __init__(
        self,
        vocab_size: int = 1000,
        d_model: int = 64,
        nhead: int = 4,
        num_layers: int = 2,
        dim_feedforward: int = 128,
        max_len: int = 128,
        num_classes: int = 3,
        dropout: float = 0.1,
    ):
        super().__init__()
        self.embed = nn.Embedding(vocab_size, d_model)
        self.pos_enc = _PositionalEncoding(d_model, max_len=max_len)
        encoder_layer = nn.TransformerEncoderLayer(
            d_model=d_model,
            nhead=nhead,
            dim_feedforward=dim_feedforward,
            dropout=dropout,
            batch_first=True,
            activation="gelu",
        )
        self.encoder = nn.TransformerEncoder(encoder_layer, num_layers=num_layers)
        self.head = nn.Linear(d_model, num_classes)

    def forward(self, tokens: torch.Tensor) -> torch.Tensor:
        x = self.embed(tokens)
        x = self.pos_enc(x)
        x = self.encoder(x)
        pooled = x.mean(dim=1)
        return self.head(pooled)


class SimpleAutoencoder(nn.Module):
    """Convolutional autoencoder for small RGB images (CIFAR-10 size).

    Encoder compresses 32x32x3 into a `bottleneck_dim` vector. Decoder
    reconstructs the input. Used by lab_breadth_autoencoder for reconstruction, denoising,
    and latent-space visualization via t-SNE / UMAP.
    """

    def __init__(
        self,
        image_channels: int = 3,
        bottleneck_dim: int = 32,
    ):
        super().__init__()
        self.encoder = nn.Sequential(
            nn.Conv2d(image_channels, 32, kernel_size=3, stride=2, padding=1),
            nn.ReLU(inplace=True),
            nn.Conv2d(32, 64, kernel_size=3, stride=2, padding=1),
            nn.ReLU(inplace=True),
            nn.Conv2d(64, 128, kernel_size=3, stride=2, padding=1),
            nn.ReLU(inplace=True),
            nn.Flatten(),
            nn.Linear(128 * 4 * 4, bottleneck_dim),
        )
        self.decoder_fc = nn.Linear(bottleneck_dim, 128 * 4 * 4)
        self.decoder = nn.Sequential(
            nn.ConvTranspose2d(128, 64, kernel_size=3, stride=2, padding=1, output_padding=1),
            nn.ReLU(inplace=True),
            nn.ConvTranspose2d(64, 32, kernel_size=3, stride=2, padding=1, output_padding=1),
            nn.ReLU(inplace=True),
            nn.ConvTranspose2d(32, image_channels, kernel_size=3, stride=2, padding=1, output_padding=1),
            nn.Sigmoid(),
        )

    def encode(self, x: torch.Tensor) -> torch.Tensor:
        return self.encoder(x)

    def decode(self, z: torch.Tensor) -> torch.Tensor:
        x = self.decoder_fc(z)
        x = x.view(-1, 128, 4, 4)
        return self.decoder(x)

    def forward(self, x: torch.Tensor) -> torch.Tensor:
        z = self.encode(x)
        return self.decode(z)


def apply_freeze(model: nn.Module, freeze_until: str | None) -> None:
    """Set `requires_grad=False` on every parameter in blocks up to `freeze_until`.

    Valid values for SimpleCNN: None, "block1", "block2".
    For other architectures, freezing is not supported yet - freeze_until
    must be None.
    """
    if freeze_until is None:
        return
    if not isinstance(model, SimpleCNN):
        raise ValueError(
            "freeze_until is only supported for SimpleCNN; "
            f"got {type(model).__name__}. Set freeze_until: null in config."
        )
    order = ["block1", "block2"]
    if freeze_until not in order:
        raise ValueError(f"freeze_until must be one of {order} or None")
    frozen = set()
    for name in order:
        frozen.add(name)
        if name == freeze_until:
            break
    for name, module in model.named_children():
        if name in frozen:
            for p in module.parameters():
                p.requires_grad = False


def build_model(cfg: dict[str, Any]) -> nn.Module:
    name = cfg["name"].lower()
    if name == "simple_cnn":
        model: nn.Module = SimpleCNN(num_classes=cfg.get("num_classes", 10))
    elif name == "simple_mlp":
        model = SimpleMLP(
            input_dim=cfg.get("input_dim", 784),
            hidden_sizes=tuple(cfg.get("hidden_sizes", (256, 128))),
            num_classes=cfg.get("num_classes", 10),
            dropout=cfg.get("dropout", 0.0),
            activation=cfg.get("activation", "relu"),
        )
    elif name == "simple_lstm":
        model = SimpleLSTM(
            input_size=cfg.get("input_size", 1),
            hidden_size=cfg.get("hidden_size", 64),
            num_layers=cfg.get("num_layers", 1),
            num_classes=cfg.get("num_classes", 1),
            dropout=cfg.get("dropout", 0.0),
            readout=cfg.get("readout", "last"),
        )
    elif name == "transformer_mini":
        model = TransformerMini(
            vocab_size=cfg.get("vocab_size", 1000),
            d_model=cfg.get("d_model", 64),
            nhead=cfg.get("nhead", 4),
            num_layers=cfg.get("num_layers", 2),
            dim_feedforward=cfg.get("dim_feedforward", 128),
            max_len=cfg.get("max_len", 128),
            num_classes=cfg.get("num_classes", 3),
            dropout=cfg.get("dropout", 0.1),
        )
    elif name == "simple_ae":
        model = SimpleAutoencoder(
            image_channels=cfg.get("image_channels", 3),
            bottleneck_dim=cfg.get("bottleneck_dim", 32),
        )
    else:
        raise ValueError(f"Unknown model: {name}")

    apply_freeze(model, cfg.get("freeze_until"))
    return model
