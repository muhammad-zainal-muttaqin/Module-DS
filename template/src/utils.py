"""Utility functions - seed control, config I/O, git metadata.

Kept deliberately small; every function is referenced from Bab 03 of the module.
"""

from __future__ import annotations

import os
import random
import subprocess
from dataclasses import dataclass
from pathlib import Path
from typing import Any

import numpy as np
import torch
import yaml


def set_seed(seed: int, deterministic: bool = True) -> None:
    """Lock randomness across Python, NumPy, and Torch (CPU + CUDA).

    Called once at the very start of every run. Missing any of these sources
    is the most common cause of "unreproducible" results - see Bab 03 §2.2.
    """
    os.environ["PYTHONHASHSEED"] = str(seed)
    random.seed(seed)
    np.random.seed(seed)
    torch.manual_seed(seed)
    torch.cuda.manual_seed_all(seed)
    if deterministic:
        torch.backends.cudnn.deterministic = True
        torch.backends.cudnn.benchmark = False


def load_config(path: str | Path) -> dict[str, Any]:
    with open(path, "r", encoding="utf-8") as f:
        return yaml.safe_load(f)


def save_config(cfg: dict[str, Any], path: str | Path) -> None:
    Path(path).parent.mkdir(parents=True, exist_ok=True)
    with open(path, "w", encoding="utf-8") as f:
        yaml.safe_dump(cfg, f, sort_keys=False, allow_unicode=True)


def git_hash() -> str:
    """Return current git commit hash, or 'nogit' if not in a repo.

    Embedded into every checkpoint so that results can be traced to code.
    """
    try:
        out = subprocess.check_output(
            ["git", "rev-parse", "--short", "HEAD"],
            stderr=subprocess.DEVNULL,
        )
        return out.decode().strip()
    except Exception:
        return "nogit"


def git_is_dirty() -> bool:
    """True if working tree has uncommitted changes."""
    try:
        out = subprocess.check_output(
            ["git", "status", "--porcelain"],
            stderr=subprocess.DEVNULL,
        )
        return bool(out.decode().strip())
    except Exception:
        return False


@dataclass
class RunMeta:
    """Metadata attached to every checkpoint."""
    experiment_name: str
    seed: int
    commit: str
    dirty: bool
    epoch: int
    metric_name: str
    metric_value: float

    def to_dict(self) -> dict[str, Any]:
        return {
            "experiment_name": self.experiment_name,
            "seed": self.seed,
            "commit": self.commit,
            "dirty": self.dirty,
            "epoch": self.epoch,
            "metric_name": self.metric_name,
            "metric_value": self.metric_value,
        }


def count_parameters(model: torch.nn.Module) -> int:
    return sum(p.numel() for p in model.parameters() if p.requires_grad)


def make_output_dir(root: str | Path, experiment_name: str, seed: int) -> Path:
    out = Path(root) / f"{experiment_name}_seed{seed}"
    out.mkdir(parents=True, exist_ok=True)
    (out / "tb").mkdir(exist_ok=True)
    return out
