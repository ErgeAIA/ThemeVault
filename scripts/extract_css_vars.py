#!/usr/bin/env python3
"""Extract CSS custom-property color declarations into extract.json (intake IR).

Mechanical, idempotent, no L1 mapping. See docs/intake-artifacts.md.

Usage:
  python scripts/extract_css_vars.py --src <css> --family <id> --pin <sha> \
      [--selector body.theme-light]... [--out <extract.json>]
"""
from __future__ import annotations

import argparse
import json
import re
import sys
from pathlib import Path

VAR_RE = re.compile(r"(--[a-zA-Z0-9-]+)\s*:\s*([^;]+)")
COLOR_KEY = (
    "background", "text", "color", "accent", "code", "typo", "graph",
    "shadow", "interactive", "border", "base",
)


def kind_of(val: str) -> str:
    if val.startswith("var(") and "color-mix" not in val and "rgb(" not in val:
        return "var-ref"
    if "color-mix" in val:
        return "color-mix"
    if "rgb(" in val:
        return "rgb"
    if val.startswith("#"):
        return "hex"
    if "rgba(" in val:
        return "rgba"
    if "linear-gradient" in val or re.search(r"\d+px", val):
        return "shadow-or-gradient"
    return "other"


def strip_important(val: str) -> tuple[str, bool]:
    v = val.strip()
    if v.endswith("!important"):
        return v[: -len("!important")].rstrip(), True
    return v, False


def iter_blocks(text: str, selector: str):
    """Yield declaration bodies for exact selector matches (incl. after `}`)."""
    esc = re.escape(selector)
    for m in re.finditer(rf"(?:^|[}},;])({esc})\s*\{{([^}}]+)\}}", text, re.M):
        yield m.group(1).strip(), m.group(2)


def extract_entries(text: str, selectors: list[str], source_file: str) -> list[dict]:
    entries: list[dict] = []
    seen: set[tuple[str, str]] = set()
    targets = selectors or [
        "body.theme-light", "body.theme-dark", ".theme-light", ".theme-dark",
    ]
    for sel in targets:
        matched = False
        for s, body in iter_blocks(text, sel):
            matched = True
            for m in VAR_RE.finditer(body):
                var, raw = m.group(1), m.group(2)
                val, _imp = strip_important(raw)
                if not any(k in var for k in COLOR_KEY):
                    continue
                key = (s, var)
                if key in seen:
                    continue
                seen.add(key)
                entries.append({
                    "selector": s,
                    "var": var,
                    "value": val,
                    "kind": kind_of(val),
                    "sourceFile": source_file,
                })
        if not matched and selectors:
            print(f"warn: selector not found: {sel}", file=sys.stderr)
    entries.sort(key=lambda e: (e["selector"], e["var"]))
    return entries


def build_extract(src: Path, family: str, pin: str, selectors: list[str]) -> dict:
    text = src.read_text(encoding="utf-8")
    entries = extract_entries(text, selectors, src.name)
    values: dict[str, dict] = {}
    for e in entries:
        v = e["value"]
        if v in values:
            values[v]["hits"] = values[v].get("hits", 1) + 1
        else:
            values[v] = {
                "kind": e["kind"],
                "witness": {
                    "sourceFile": e["sourceFile"],
                    "var": e["var"],
                    "selector": e["selector"],
                },
                "hits": 1,
            }
    return {
        "schemaVersion": 2,
        "family": family,
        "pin": pin,
        "kind": "value-ledger",
        "provenance": "full",
        "values": dict(sorted(values.items())),
    }


def main(argv: list[str] | None = None) -> int:
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument("--src", required=True, type=Path)
    ap.add_argument("--family", required=True)
    ap.add_argument("--pin", required=True)
    ap.add_argument("--selector", action="append", default=[])
    ap.add_argument("--out", type=Path, default=None)
    args = ap.parse_args(argv)
    if not args.src.exists():
        print(f"ERROR: missing source {args.src}", file=sys.stderr)
        return 1
    doc = build_extract(args.src, args.family, args.pin, args.selector)
    payload = json.dumps(doc, ensure_ascii=False, indent=2) + "\n"
    if args.out:
        args.out.parent.mkdir(parents=True, exist_ok=True)
        args.out.write_text(payload, encoding="utf-8")
        print(f"wrote {args.out} entries={len(doc['entries'])}")
    else:
        sys.stdout.write(payload)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
