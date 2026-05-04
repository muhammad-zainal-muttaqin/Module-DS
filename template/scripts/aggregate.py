"""
Aggregate experiment results from multiple runs into a summary table.

Usage:
    python scripts/aggregate.py --dir experiments/lab3/
    python scripts/aggregate.py --dir experiments/lab3/ --out results_summary.csv
"""

import argparse
import csv
import json
from pathlib import Path

import numpy as np


def load_run(run_dir: Path) -> dict | None:
    summary_file = run_dir / "summary.json"
    config_file = run_dir / "config.yaml"

    if not summary_file.exists():
        return None

    with open(summary_file, encoding="utf-8") as f:
        summary = json.load(f)

    result = {"run": run_dir.name}
    # Flatten summary metrics into the result dict.
    for key, val in summary.items():
        if key in ("config",):
            continue
        if isinstance(val, (int, float)):
            result[key] = float(val)
        else:
            result[key] = val

    if config_file.exists():
        try:
            import yaml
            with open(config_file) as f:
                cfg = yaml.safe_load(f)
            result["config"] = cfg
        except Exception:
            pass

    return result


def aggregate(exp_dir: Path) -> list[dict]:
    run_dirs = sorted([d for d in exp_dir.iterdir() if d.is_dir()])
    results = [r for d in run_dirs if (r := load_run(d)) is not None]
    return results


def summarize(results: list[dict]) -> dict:
    if not results:
        return {}

    numeric_keys = [
        k for k in results[0]
        if isinstance(results[0][k], float) and k not in ("epoch",)
    ]

    summary = {}
    for key in numeric_keys:
        vals = [r[key] for r in results if isinstance(r.get(key), float)]
        if vals:
            summary[key] = {"mean": np.mean(vals), "std": np.std(vals), "n": len(vals)}

    return summary


def print_table(summary: dict) -> None:
    if not summary:
        print("No numeric metrics found.")
        return

    header = f"{'Metric':<30} {'Mean':>10} {'Std':>10} {'N':>5}"
    print(header)
    print("-" * len(header))
    for key, stats in summary.items():
        print(f"{key:<30} {stats['mean']:>10.4f} {stats['std']:>10.4f} {stats['n']:>5}")


def main() -> None:
    parser = argparse.ArgumentParser(description="Aggregate experiment run results.")
    parser.add_argument("--dir", required=True, help="Path to experiment directory.")
    parser.add_argument("--out", default=None, help="Optional CSV output path.")
    args = parser.parse_args()

    exp_dir = Path(args.dir)
    if not exp_dir.exists():
        raise FileNotFoundError(f"Directory not found: {exp_dir}")

    results = aggregate(exp_dir)
    print(f"Found {len(results)} valid runs in {exp_dir}\n")

    summary = summarize(results)
    print_table(summary)

    if args.out:
        out_path = Path(args.out)
        with open(out_path, "w", newline="") as f:
            writer = csv.writer(f)
            writer.writerow(["metric", "mean", "std", "n"])
            for key, stats in summary.items():
                writer.writerow([key, stats["mean"], stats["std"], stats["n"]])
        print(f"\nSaved to {out_path}")


if __name__ == "__main__":
    main()
