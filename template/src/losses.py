"""Loss functions: CrossEntropy (wrapper) + FocalLoss.

FocalLoss is implemented so that `gamma=0` and `alpha=None` reduce exactly
to standard cross-entropy - a property exercised as a sanity check in
Bab 02 §3 (Worked Example).
"""

from __future__ import annotations

from typing import Any

import torch
import torch.nn as nn
import torch.nn.functional as F


class FocalLoss(nn.Module):
    """Multi-class focal loss. Reduces to cross-entropy when gamma=0.

    Args:
        gamma: focusing parameter. 0.0 disables focusing.
        alpha: per-class weights of shape (C,), or None.
        label_smoothing: pass-through to internal CE.
    """

    def __init__(
        self,
        gamma: float = 2.0,
        alpha: list[float] | None = None,
        label_smoothing: float = 0.0,
    ):
        super().__init__()
        self.gamma = gamma
        self.label_smoothing = label_smoothing
        if alpha is not None:
            self.register_buffer("alpha", torch.tensor(alpha, dtype=torch.float32))
        else:
            self.alpha = None  # type: ignore[assignment]

    def forward(self, logits: torch.Tensor, targets: torch.Tensor) -> torch.Tensor:
        ce = F.cross_entropy(
            logits, targets, reduction="none", label_smoothing=self.label_smoothing
        )
        if self.gamma == 0.0 and self.alpha is None:
            return ce.mean()

        # p_t = probability assigned to the true class
        with torch.no_grad():
            probs = F.softmax(logits, dim=1)
            pt = probs.gather(1, targets.unsqueeze(1)).squeeze(1).clamp_min(1e-8)
        focal_weight = (1.0 - pt) ** self.gamma
        loss = focal_weight * ce

        if self.alpha is not None:
            at = self.alpha.to(loss.device)[targets]
            loss = at * loss

        return loss.mean()


def build_loss(cfg: dict[str, Any]) -> nn.Module:
    name = cfg["name"].lower()
    if name in ("cross_entropy", "ce"):
        return nn.CrossEntropyLoss(label_smoothing=cfg.get("label_smoothing", 0.0))
    if name == "focal":
        return FocalLoss(
            gamma=cfg.get("gamma", 2.0),
            alpha=cfg.get("alpha", None),
            label_smoothing=cfg.get("label_smoothing", 0.0),
        )
    if name == "mse":
        return nn.MSELoss()
    if name in ("bce", "bce_with_logits"):
        return nn.BCEWithLogitsLoss()
    raise ValueError(f"Unknown loss: {name}")
