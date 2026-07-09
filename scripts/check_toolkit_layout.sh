#!/usr/bin/env bash
set -u

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT" || exit 1

status=0

check_dir() {
  local path="$1"
  if [ -d "$path" ]; then
    printf 'OK\t%s\n' "$path"
  else
    printf 'MISSING\t%s\n' "$path"
    status=1
  fi
}

check_file() {
  local path="$1"
  if [ -f "$path" ]; then
    printf 'OK\t%s\n' "$path"
  else
    printf 'MISSING\t%s\n' "$path"
    status=1
  fi
}

top_dirs=(
  bin envs logs scripts smoke docs inventory
  software references examples templates
)

for d in "${top_dirs[@]}"; do
  check_dir "$d"
done

check_file README.md
check_file RESOURCE_INDEX.md
check_file LICENSE_AUDIT.md
check_file inventory/resources.yaml

resources=(
  software/diagramming/d2
  software/diagramming/graphviz
  software/diagramming/mermaid-cli
  software/diagramming/drawio
  software/diagramming/plantuml
  software/diagramming/typst
  software/diagramming/manim
  software/diagramming/diagrams-py
  software/diagramming/excalidraw
  software/scientific-figure-generation/Paper2Any
  software/scientific-figure-generation/AutoFigure
  software/scientific-figure-generation/AutoFigure-Edit
  software/scientific-figure-generation/academic-figure-generator
  software/scientific-figure-generation/Crafter
  software/scientific-figure-generation/LiveFigure
  software/scientific-figure-generation/FigureWeave
  software/code-knowledge-audit/graphify
  references/visual-examples/figures4papers
  references/prompt-resources/awesome-ai-research-writing
  references/research-system-references/awesome-autoresearch
)

for r in "${resources[@]}"; do
  check_dir "$r"
  check_dir "$r/repo"
  check_file "$r/README.md"
done

exit "$status"
