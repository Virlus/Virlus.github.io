#!/usr/bin/env python3
"""Create a paper-style offline/online RL comparison bar chart."""

from __future__ import annotations

import argparse
import csv
from pathlib import Path

import matplotlib as mpl
import matplotlib.pyplot as plt
from matplotlib import transforms
from matplotlib.patches import Patch, Rectangle
import numpy as np


OFFLINE = "#99B898"
ONLINE = "#FACA66"
BACKGROUND = "#F3EFE4"
EDGE = "#202020"
GRID = "#D6D6D6"

# Embed TrueType fonts in PDF/PS exports instead of Type 3 glyphs.
mpl.rcParams["pdf.fonttype"] = 42
mpl.rcParams["ps.fonttype"] = 42

FIGURE_DIR = Path(__file__).resolve().parent

SERIES = (
    ("Offline RL", OFFLINE, ""),
    ("Offline RL + LfE", OFFLINE, "///"),
    ("Online RL", ONLINE, ""),
    ("Online RL + LfE", ONLINE, "///"),
)


def load_panels(csv_path: Path) -> dict[str, dict[str, object]]:
    panels: dict[str, dict[str, object]] = {}
    with csv_path.open(newline="", encoding="utf-8") as csv_file:
        rows = csv.DictReader(csv_file)
        required = {
            "panel",
            "caption",
            "method",
            "learn_from_experience",
            "mean",
            "error",
            "is_placeholder",
        }
        if rows.fieldnames is None or not required.issubset(rows.fieldnames):
            raise ValueError(f"CSV must contain: {', '.join(sorted(required))}")

        for row in rows:
            panel = row["panel"]
            learn = row["learn_from_experience"].strip().lower() in {"1", "true", "yes"}
            is_placeholder = row["is_placeholder"].strip().lower() in {"1", "true", "yes"}
            panel_data = panels.setdefault(panel, {"caption": row["caption"], "values": {}})
            panel_data["values"][(row["method"].strip(), learn)] = (
                float(row["mean"]),
                float(row["error"]),
                is_placeholder,
            )

        for panel, panel_data in panels.items():
            panel_values = panel_data.pop("values")
            order = (("Offline RL", False), ("Offline RL", True), ("Online RL", False), ("Online RL", True))
            missing = [key for key in order if key not in panel_values]
            if missing:
                raise ValueError(f"Panel {panel!r} is missing series: {missing}")
            panel_data["means"] = [panel_values[key][0] for key in order]
            panel_data["errors"] = [panel_values[key][1] for key in order]
            panel_data["placeholders"] = [panel_values[key][2] for key in order]
    return panels


def create_figure(panels: dict[str, dict[str, object]]) -> plt.Figure:
    plt.rcParams.update(
        {
            "font.family": "DejaVu Sans",
            "font.size": 13,
            "axes.edgecolor": EDGE,
            "axes.linewidth": 1.0,
            "hatch.color": EDGE,
            "hatch.linewidth": 1.3,
            "figure.facecolor": BACKGROUND,
            "axes.facecolor": BACKGROUND,
            "savefig.facecolor": BACKGROUND,
        }
    )

    panel_count = len(panels)
    figure_width = 8.4 if panel_count == 1 else 7.2
    figure_height = 6.1 if panel_count == 1 else 4.4
    fig, axes = plt.subplots(
        1,
        panel_count,
        figsize=(figure_width, figure_height),
        sharey=True,
        squeeze=False,
    )
    axes = axes.ravel()
    x = np.arange(len(SERIES))

    for ax, (title, panel) in zip(axes, panels.items()):
        means = panel["means"]
        errors = panel["errors"]
        placeholders = panel["placeholders"]
        bar_width = 0.52
        shadow_transform = ax.transData + transforms.ScaledTranslation(
            4.2 / 72,
            -3.2 / 72,
            fig.dpi_scale_trans,
        )

        for index, ((_, color, hatch), mean, error, is_placeholder) in enumerate(
            zip(SERIES, means, errors, placeholders)
        ):
            if is_placeholder:
                continue
            ax.add_patch(
                Rectangle(
                    (index - bar_width / 2, 0),
                    bar_width,
                    mean,
                    transform=shadow_transform,
                    facecolor="#555555",
                    edgecolor="none",
                    alpha=0.48,
                    zorder=2,
                )
            )
            ax.bar(
                index,
                mean,
                width=bar_width,
                color=color,
                edgecolor=EDGE,
                linewidth=2.1,
                hatch=hatch,
                zorder=3,
            )
            ax.plot(
                [index - bar_width / 2, index + bar_width / 2],
                [0, 0],
                color=EDGE,
                linewidth=2.1,
                solid_capstyle="butt",
                zorder=4,
            )
            ax.errorbar(
                index,
                mean,
                yerr=error,
                fmt="none",
                ecolor=EDGE,
                elinewidth=1.8,
                capsize=4,
                capthick=1.8,
                zorder=4,
            )

        display_title = "\n".join(title.rsplit(" ", 1)) if panel_count > 1 else title
        ax.set_title(
            display_title,
            fontsize=16,
            fontweight="bold",
            fontstyle="italic",
            pad=12,
        )
        ax.set_xticks(x)
        ax.set_xlim(-0.6, len(SERIES) - 0.4)
        ax.set_xticklabels([])
        ax.tick_params(axis="x", length=0)
        ax.set_ylim(-3.5, 105)
        ax.set_yticks(np.arange(0, 101, 20))
        ax.grid(axis="y", color=GRID, linewidth=0.9, zorder=0)
        ax.spines["top"].set_visible(False)
        ax.spines["right"].set_visible(False)
        ax.spines["bottom"].set_visible(False)
        if all(placeholders):
            ax.text(
                0.5,
                0.48,
                "Results\nplaceholder",
                transform=ax.transAxes,
                ha="center",
                va="center",
                fontsize=15,
                fontweight="bold",
                color="#777777",
            )
        elif any(placeholders):
            for index, missing in enumerate(placeholders):
                if missing:
                    ax.text(
                        index, 4, "Pending", rotation=90,
                        ha="center", va="bottom", fontsize=10,
                        color="#777777", fontstyle="italic",
                    )

    axes[0].set_ylabel(
        "Success Rate (%)",
        fontsize=17,
        fontweight="bold",
        labelpad=11,
    )
    axes[0].tick_params(axis="y", labelsize=14)
    plt.setp(axes[0].get_yticklabels(), fontweight="bold")
    for axis in axes[1:]:
        axis.spines["left"].set_visible(False)
        axis.tick_params(axis="y", length=0)

    handles = [
        Patch(
            facecolor=color,
            edgecolor=EDGE,
            linewidth=1.8,
            hatch=hatch,
            label=label,
        )
        for label, color, hatch in SERIES
    ]
    fig.legend(
        handles=handles,
        loc="upper center",
        bbox_to_anchor=(0.5, 0.995),
        ncol=2 if panel_count == 1 else 4,
        frameon=False,
        prop={"size": 13, "weight": "bold", "style": "italic"},
        handlelength=1.5,
        handleheight=1.2,
        columnspacing=0.7,
    )
    if panel_count == 1:
        fig.subplots_adjust(top=0.78, bottom=0.14, left=0.14, right=0.97)
    else:
        fig.subplots_adjust(top=0.72, bottom=0.14, left=0.13, right=0.99, wspace=0.08)
    return fig


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Plot offline and online RL results with LfE variants.")
    parser.add_argument("--data", type=Path, default=FIGURE_DIR / "data" / "results.csv")
    parser.add_argument("--output-dir", type=Path, default=FIGURE_DIR / "outputs")
    parser.add_argument(
        "--panel",
        action="append",
        help="Panel to include; repeat to select multiple panels. By default, all panels are shown.",
    )
    parser.add_argument("--output-stem", default="comparison")
    return parser.parse_args()


def main() -> None:
    args = parse_args()
    args.output_dir.mkdir(parents=True, exist_ok=True)
    panels = load_panels(args.data)
    if args.panel:
        unknown_panels = [panel for panel in args.panel if panel not in panels]
        if unknown_panels:
            raise ValueError(f"Unknown panels: {unknown_panels}")
        panels = {panel: panels[panel] for panel in args.panel}
    figure = create_figure(panels)
    figure.savefig(args.output_dir / f"{args.output_stem}.png", dpi=220, bbox_inches="tight", pad_inches=0.12)
    figure.savefig(args.output_dir / f"{args.output_stem}.pdf", bbox_inches="tight", pad_inches=0.12)
    plt.close(figure)


if __name__ == "__main__":
    main()
