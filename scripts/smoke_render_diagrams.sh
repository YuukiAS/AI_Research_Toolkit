#!/usr/bin/env bash
set -u

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT" || exit 1

REPORT="smoke/smoke_render_report.txt"
mkdir -p smoke/d2 smoke/graphviz smoke/mermaid smoke/plantuml smoke/typst smoke/manim
: > "$REPORT"

log() {
  printf '%s\t%s\t%s\n' "$1" "$2" "$3" | tee -a "$REPORT"
}

cat > smoke/d2/smoke_architecture.d2 <<'EOF'
researcher -> toolkit: asks for diagram
toolkit -> renderer: sends source
renderer -> svg: writes output
EOF

cat > smoke/graphviz/smoke_map.dot <<'EOF'
digraph G {
  rankdir=LR;
  paper -> figure;
  figure -> review;
}
EOF

cat > smoke/mermaid/smoke_flow.mmd <<'EOF'
flowchart LR
  A[Paper] --> B[Prompt]
  B --> C[Figure]
EOF

cat > smoke/plantuml/smoke_sequence.puml <<'EOF'
@startuml
User -> Toolkit: request render
Toolkit -> Renderer: run command
Renderer --> Toolkit: svg
@enduml
EOF

cat > smoke/typst/smoke_note.typ <<'EOF'
= Toolkit Smoke Test

This is a minimal Typst render check.
EOF

cat > smoke/manim/smoke_scene.py <<'EOF'
from manim import *

class SmokeScene(Scene):
    def construct(self):
        self.add(Text("AI Research Toolkit"))
EOF

if command -v d2 >/dev/null 2>&1; then
  if d2 smoke/d2/smoke_architecture.d2 smoke/d2/smoke_architecture.svg >>"$REPORT" 2>&1; then
    log d2 OK smoke/d2/smoke_architecture.svg
  else
    log d2 BROKEN "render failed"
  fi
else
  log d2 MISSING "d2 command not found"
fi

if command -v dot >/dev/null 2>&1; then
  if dot -Tsvg smoke/graphviz/smoke_map.dot -o smoke/graphviz/smoke_map.svg >>"$REPORT" 2>&1; then
    log graphviz OK smoke/graphviz/smoke_map.svg
  else
    log graphviz BROKEN "dot render failed"
  fi
else
  log graphviz MISSING "dot command not found"
fi

if command -v mmdc >/dev/null 2>&1; then
  if mmdc -i smoke/mermaid/smoke_flow.mmd -o smoke/mermaid/smoke_flow.svg >>"$REPORT" 2>&1; then
    log mermaid OK smoke/mermaid/smoke_flow.svg
  else
    log mermaid BROKEN "mmdc render failed"
  fi
else
  log mermaid MISSING "mmdc command not found"
fi

if command -v plantuml >/dev/null 2>&1; then
  if plantuml -tsvg smoke/plantuml/smoke_sequence.puml >>"$REPORT" 2>&1; then
    log plantuml OK smoke/plantuml/smoke_sequence.svg
  else
    log plantuml BROKEN "plantuml render failed"
  fi
elif [ -n "${PLANTUML_JAR:-}" ] && [ -f "$PLANTUML_JAR" ] && command -v java >/dev/null 2>&1; then
  if java -jar "$PLANTUML_JAR" -tsvg smoke/plantuml/smoke_sequence.puml >>"$REPORT" 2>&1; then
    log plantuml-jar OK smoke/plantuml/smoke_sequence.svg
  else
    log plantuml-jar BROKEN "plantuml.jar render failed"
  fi
elif [ -f "bin/plantuml.jar" ] && command -v java >/dev/null 2>&1; then
  if java -jar bin/plantuml.jar -tsvg smoke/plantuml/smoke_sequence.puml >>"$REPORT" 2>&1; then
    log plantuml-jar OK smoke/plantuml/smoke_sequence.svg
  else
    log plantuml-jar BROKEN "bin/plantuml.jar render failed"
  fi
else
  log plantuml MISSING "plantuml command or jar not found"
fi

if command -v typst >/dev/null 2>&1; then
  if typst compile smoke/typst/smoke_note.typ smoke/typst/smoke_note.pdf >>"$REPORT" 2>&1; then
    log typst OK smoke/typst/smoke_note.pdf
  else
    log typst BROKEN "typst compile failed"
  fi
else
  log typst MISSING "typst command not found"
fi

if command -v manim >/dev/null 2>&1; then
  if manim --version >>"$REPORT" 2>&1; then
    log manim OK "version check only; no long video render"
  else
    log manim BROKEN "manim version failed"
  fi
else
  log manim MISSING "manim command not found"
fi
