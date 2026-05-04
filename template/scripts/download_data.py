"""
Download and prepare datasets used in this module.

Usage:
    python scripts/download_data.py --dataset pathmnist --dest data/
    python scripts/download_data.py --dataset cifar10 --dest data/
    python scripts/download_data.py --list
"""

import argparse
from pathlib import Path

SUPPORTED = {
    "cifar10": "CIFAR-10 image classification dataset (torchvision)",
    "pathmnist": "PathMNIST histology patches from MedMNIST (medmnist)",
}


def download_cifar10(dest: Path) -> None:
    try:
        import torchvision
    except ImportError:
        raise ImportError("Install torchvision: pip install torchvision")

    dest.mkdir(parents=True, exist_ok=True)
    print(f"Downloading CIFAR-10 to {dest} ...")
    torchvision.datasets.CIFAR10(root=str(dest), train=True, download=True)
    torchvision.datasets.CIFAR10(root=str(dest), train=False, download=True)
    print("CIFAR-10 ready.")


def download_pathmnist(dest: Path) -> None:
    try:
        import medmnist
        from medmnist import PathMNIST
    except ImportError:
        raise ImportError("Install medmnist: pip install medmnist")

    dest.mkdir(parents=True, exist_ok=True)
    print(f"Downloading PathMNIST to {dest} ...")
    for split in ("train", "val", "test"):
        PathMNIST(split=split, download=True, root=str(dest))
    print("PathMNIST ready.")


HANDLERS = {
    "cifar10": download_cifar10,
    "pathmnist": download_pathmnist,
}


def main() -> None:
    parser = argparse.ArgumentParser(description="Download datasets for this module.")
    parser.add_argument(
        "--dataset",
        choices=list(SUPPORTED.keys()),
        help="Dataset to download.",
    )
    parser.add_argument(
        "--dest",
        default="data/",
        help="Destination directory (default: data/).",
    )
    parser.add_argument(
        "--list",
        action="store_true",
        help="List supported datasets and exit.",
    )
    args = parser.parse_args()

    if args.list:
        print("Supported datasets:")
        for name, desc in SUPPORTED.items():
            print(f"  {name:<15} {desc}")
        return

    if not args.dataset:
        parser.error("Provide --dataset or --list.")

    dest = Path(args.dest)
    HANDLERS[args.dataset](dest)


if __name__ == "__main__":
    main()
