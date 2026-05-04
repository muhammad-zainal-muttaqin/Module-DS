"""Data loading: CIFAR-10 (default) with optional PathMNIST support.

Design notes (see Bab 04):
- All preprocessing statistics are computed from the train split only.
  Test transforms use the same statistics but never recompute them.
- A `dry_run` mode returns tiny subsets so the pipeline can be smoke-tested
  without downloading full datasets.
"""

from __future__ import annotations

from pathlib import Path
from typing import Any

import torch
from torch.utils.data import DataLoader, Subset, random_split
from torchvision import datasets, transforms


CIFAR10_MEAN = (0.4914, 0.4822, 0.4465)
CIFAR10_STD = (0.2470, 0.2435, 0.2616)


def _cifar10_transforms(train: bool, image_size: int, augment: bool) -> transforms.Compose:
    ops: list[Any] = []
    if train and augment:
        ops += [
            transforms.RandomCrop(image_size, padding=4),
            transforms.RandomHorizontalFlip(),
        ]
    ops += [
        transforms.Resize(image_size),
        transforms.ToTensor(),
        transforms.Normalize(CIFAR10_MEAN, CIFAR10_STD),
    ]
    return transforms.Compose(ops)


def _build_cifar10(cfg: dict[str, Any], dry_run: bool):
    root = cfg["root"]
    image_size = cfg.get("image_size", 32)
    augment = cfg.get("augment", True)

    train_tf = _cifar10_transforms(train=True, image_size=image_size, augment=augment)
    test_tf = _cifar10_transforms(train=False, image_size=image_size, augment=False)

    download = not dry_run  # avoid heavy download in smoke test
    try:
        train_full = datasets.CIFAR10(root, train=True, download=download, transform=train_tf)
        test_set = datasets.CIFAR10(root, train=False, download=download, transform=test_tf)
    except Exception as e:
        if dry_run:
            # In dry-run, fabricate a tiny in-memory dataset to avoid any download.
            return _fake_classification_dataset(image_size, num_classes=cfg.get("num_classes", 10))
        raise e

    val_split = cfg.get("val_split", 0.1)
    n_val = int(len(train_full) * val_split)
    n_train = len(train_full) - n_val
    gen = torch.Generator().manual_seed(0)  # stable split, independent of run seed
    train_set, val_set = random_split(train_full, [n_train, n_val], generator=gen)

    if dry_run:
        train_set = Subset(train_set, list(range(64)))
        val_set = Subset(val_set, list(range(32)))
        test_set = Subset(test_set, list(range(32)))

    return train_set, val_set, test_set


class _FakeImageDataset(torch.utils.data.Dataset):
    """In-memory dataset used only for dry-run smoke tests without any download."""

    def __init__(self, n: int, image_size: int, num_classes: int):
        self.images = torch.randn(n, 3, image_size, image_size)
        self.labels = torch.randint(0, num_classes, (n,))

    def __len__(self) -> int:
        return self.images.shape[0]

    def __getitem__(self, idx: int):
        return self.images[idx], int(self.labels[idx])


def _fake_classification_dataset(image_size: int, num_classes: int):
    train_set = _FakeImageDataset(64, image_size, num_classes)
    val_set = _FakeImageDataset(32, image_size, num_classes)
    test_set = _FakeImageDataset(32, image_size, num_classes)
    return train_set, val_set, test_set


def _build_mnist(cfg: dict[str, Any], dry_run: bool):
    """MNIST loader; returns tensors flattened to 784-dim when cfg['flatten'] is True.

    Used by Lab W1 (MLP from-scratch) via `configs/mlp_mnist.yaml`.
    """
    root = cfg["root"]
    flatten = bool(cfg.get("flatten", True))

    tfs: list[Any] = [transforms.ToTensor(), transforms.Normalize((0.1307,), (0.3081,))]
    if flatten:
        tfs.append(transforms.Lambda(lambda x: x.view(-1)))
    tf = transforms.Compose(tfs)

    download = not dry_run
    try:
        train_full = datasets.MNIST(root, train=True, download=download, transform=tf)
        test_set = datasets.MNIST(root, train=False, download=download, transform=tf)
    except Exception as e:
        if dry_run:
            return _fake_flat_dataset(dim=784 if flatten else None, num_classes=10)
        raise e

    val_split = cfg.get("val_split", 0.1)
    n_val = int(len(train_full) * val_split)
    n_train = len(train_full) - n_val
    gen = torch.Generator().manual_seed(0)
    train_set, val_set = random_split(train_full, [n_train, n_val], generator=gen)

    if dry_run:
        train_set = Subset(train_set, list(range(64)))
        val_set = Subset(val_set, list(range(32)))
        test_set = Subset(test_set, list(range(32)))
    return train_set, val_set, test_set


class _FakeFlatDataset(torch.utils.data.Dataset):
    def __init__(self, n: int, dim: int, num_classes: int):
        self.x = torch.randn(n, dim)
        self.y = torch.randint(0, num_classes, (n,))
    def __len__(self) -> int:
        return self.x.shape[0]
    def __getitem__(self, idx: int):
        return self.x[idx], int(self.y[idx])


def _fake_flat_dataset(dim: int | None, num_classes: int):
    d = dim if dim is not None else 784
    return (_FakeFlatDataset(64, d, num_classes),
            _FakeFlatDataset(32, d, num_classes),
            _FakeFlatDataset(32, d, num_classes))


class _SineSequenceDataset(torch.utils.data.Dataset):
    """Synthetic sine + noise for one-step-ahead regression.

    Each sample is (x, y) where x has shape (seq_len, 1) and y is the next value.
    Used by Lab W5 via `configs/lstm_timeseries.yaml`.
    """

    def __init__(self, n: int, seq_len: int, noise_std: float, seed: int):
        g = torch.Generator().manual_seed(seed)
        starts = torch.rand(n, generator=g) * 2 * torch.pi
        freqs = 0.5 + torch.rand(n, generator=g) * 1.5  # 0.5..2.0 rad/step
        t = torch.arange(seq_len + 1).float().unsqueeze(0)
        waves = torch.sin(starts.unsqueeze(1) + freqs.unsqueeze(1) * t * 0.3)
        waves = waves + noise_std * torch.randn(n, seq_len + 1, generator=g)
        self.x = waves[:, :seq_len].unsqueeze(-1)   # (n, seq_len, 1)
        self.y = waves[:, seq_len]                   # (n,)

    def __len__(self) -> int:
        return self.x.shape[0]

    def __getitem__(self, idx: int):
        return self.x[idx], self.y[idx]


def _build_sine(cfg: dict[str, Any], dry_run: bool):
    seq_len = cfg.get("seq_len", 32)
    noise = cfg.get("noise_std", 0.1)
    n_tr = cfg.get("n_train", 4000)
    n_va = cfg.get("n_val", 500)
    n_te = cfg.get("n_test", 500)
    if dry_run:
        n_tr, n_va, n_te = 64, 32, 32
    return (_SineSequenceDataset(n_tr, seq_len, noise, seed=0),
            _SineSequenceDataset(n_va, seq_len, noise, seed=1),
            _SineSequenceDataset(n_te, seq_len, noise, seed=2))


def _build_cifar10_unlabeled(cfg: dict[str, Any], dry_run: bool):
    """CIFAR-10 with labels still emitted by DataLoader (for optional t-SNE coloring)
    but training code treats targets as image reconstruction. Used by lab_breadth_autoencoder via
    `configs/ae_cifar.yaml`.
    """
    return _build_cifar10(cfg, dry_run)


def _build_pathmnist(cfg: dict[str, Any], dry_run: bool):
    """Optional dataset; requires `medmnist` extra. Not used in Lab 1-3."""
    try:
        import medmnist  # type: ignore
        from medmnist import INFO  # type: ignore
    except ImportError as e:
        raise ImportError(
            "PathMNIST requires the 'medical' extra: pip install -e '.[medical]'"
        ) from e

    info = INFO["pathmnist"]
    DataClass = getattr(medmnist, info["python_class"])
    image_size = cfg.get("image_size", 28)

    mean = (0.5, 0.5, 0.5)
    std = (0.5, 0.5, 0.5)
    train_tf = transforms.Compose([
        transforms.Resize(image_size),
        transforms.ToTensor(),
        transforms.Normalize(mean, std),
    ])
    test_tf = train_tf

    download = not dry_run
    train_set = DataClass(split="train", transform=train_tf, download=download)
    val_set = DataClass(split="val", transform=test_tf, download=download)
    test_set = DataClass(split="test", transform=test_tf, download=download)

    if dry_run:
        train_set = Subset(train_set, list(range(64)))
        val_set = Subset(val_set, list(range(32)))
        test_set = Subset(test_set, list(range(32)))

    return train_set, val_set, test_set


class _ToySequenceDataset(torch.utils.data.Dataset):
    """Fully synthetic integer-token sequences for sequence classification.

    Each sample is (tokens, label) where tokens has shape (max_len,) dtype long
    and label is an integer in [0, num_classes). Labels are deterministically
    derived from token sums so accuracy is learnable without any download.
    Used by Lab W7 via `configs/transformer_mini.yaml`.
    """

    def __init__(self, n: int, vocab_size: int, max_len: int, num_classes: int, seed: int):
        g = torch.Generator().manual_seed(seed)
        self.tokens = torch.randint(0, vocab_size, (n, max_len), generator=g)
        # Label = token-sum mod num_classes — simple but learnable
        self.labels = (self.tokens.sum(dim=1) % num_classes).long()

    def __len__(self) -> int:
        return self.tokens.shape[0]

    def __getitem__(self, idx: int):
        return self.tokens[idx], int(self.labels[idx])


def _build_toy_sequence(cfg: dict[str, Any], dry_run: bool):
    vocab_size = cfg.get("vocab_size", 1000)
    max_len = cfg.get("max_len", 64)
    num_classes = cfg.get("num_classes", 3)
    n_tr = cfg.get("n_train", 4000)
    n_va = cfg.get("n_val", 500)
    n_te = cfg.get("n_test", 500)
    if dry_run:
        n_tr, n_va, n_te = 64, 32, 32
    return (
        _ToySequenceDataset(n_tr, vocab_size, max_len, num_classes, seed=0),
        _ToySequenceDataset(n_va, vocab_size, max_len, num_classes, seed=1),
        _ToySequenceDataset(n_te, vocab_size, max_len, num_classes, seed=2),
    )


class _TabularSharedDataset(torch.utils.data.Dataset):
    """Synthetic tabular dataset where the *same* input features support three
    task formulations (regression, binary classification, multiclass).

    Used by Lab W1 via `configs/mlp_tabular.yaml`. The cfg key `task`
    selects which target is returned: "regression", "binary", or "multiclass".
    All three formulations share the underlying generative process, so trainees
    can compare loss-head matching across tasks without changing input data.
    """

    def __init__(self, n: int, n_features: int, task: str, seed: int):
        g = torch.Generator().manual_seed(seed)
        self.x = torch.randn(n, n_features, generator=g)
        weights = torch.linspace(-1.0, 1.0, n_features).unsqueeze(0)
        signal = (self.x * weights).sum(dim=1)
        signal = signal + 0.1 * torch.randn(n, generator=g)
        self.task = task
        if task == "regression":
            self.y = signal.float()
        elif task == "binary":
            self.y = (signal > 0).long()
        elif task == "multiclass":
            q1 = torch.quantile(signal, 0.33)
            q2 = torch.quantile(signal, 0.66)
            y = torch.zeros_like(signal, dtype=torch.long)
            y[signal > q1] = 1
            y[signal > q2] = 2
            self.y = y
        else:
            raise ValueError(f"Unknown task: {task}")

    def __len__(self) -> int:
        return self.x.shape[0]

    def __getitem__(self, idx: int):
        if self.task == "regression":
            return self.x[idx], float(self.y[idx])
        return self.x[idx], int(self.y[idx])


def _build_tabular(cfg: dict[str, Any], dry_run: bool):
    n_features = cfg.get("n_features", 10)
    task = cfg.get("task", "binary")
    n_tr = cfg.get("n_train", 4000)
    n_va = cfg.get("n_val", 500)
    n_te = cfg.get("n_test", 500)
    if dry_run:
        n_tr, n_va, n_te = 64, 32, 32
    return (
        _TabularSharedDataset(n_tr, n_features, task, seed=0),
        _TabularSharedDataset(n_va, n_features, task, seed=1),
        _TabularSharedDataset(n_te, n_features, task, seed=2),
    )


def build_datasets(cfg: dict[str, Any], dry_run: bool = False):
    """Dispatch by `cfg["name"]`. Returns (train, val, test) datasets."""
    name = cfg["name"].lower()
    if name == "cifar10":
        return _build_cifar10(cfg, dry_run)
    if name == "pathmnist":
        return _build_pathmnist(cfg, dry_run)
    if name == "mnist":
        return _build_mnist(cfg, dry_run)
    if name == "sine_sequence":
        return _build_sine(cfg, dry_run)
    if name == "cifar10_unlabeled":
        return _build_cifar10_unlabeled(cfg, dry_run)
    if name == "toy_sequence":
        return _build_toy_sequence(cfg, dry_run)
    if name == "tabular_shared":
        return _build_tabular(cfg, dry_run)
    raise ValueError(f"Unknown dataset: {name}")


def build_loaders(cfg: dict[str, Any], dry_run: bool = False):
    train_set, val_set, test_set = build_datasets(cfg, dry_run)

    batch_size = cfg.get("batch_size", 128)
    if dry_run:
        batch_size = min(batch_size, 8)  # ensure at least a few batches in smoke test
    num_workers = 0 if dry_run else cfg.get("num_workers", 2)

    train_loader = DataLoader(
        train_set, batch_size=batch_size, shuffle=True,
        num_workers=num_workers, drop_last=True, pin_memory=True,
    )
    val_loader = DataLoader(
        val_set, batch_size=batch_size, shuffle=False,
        num_workers=num_workers, pin_memory=True,
    )
    test_loader = DataLoader(
        test_set, batch_size=batch_size, shuffle=False,
        num_workers=num_workers, pin_memory=True,
    )
    return train_loader, val_loader, test_loader
