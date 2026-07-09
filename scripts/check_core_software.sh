#!/usr/bin/env bash
set -u

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
export PATH="$ROOT/bin:$ROOT/envs/npm-prefix/bin:$PATH"

run_check() {
  local label="$1"
  shift
  if ! command -v "$1" >/dev/null 2>&1; then
    printf '%s\tMISSING\t%s\n' "$label" "$1"
    return 0
  fi

  local output
  output="$("$@" 2>&1)"
  local rc=$?
  if [ "$rc" -eq 0 ]; then
    printf '%s\tOK\t%s\n' "$label" "$(printf '%s' "$output" | head -n 1)"
  else
    printf '%s\tBROKEN\t%s\n' "$label" "$(printf '%s' "$output" | head -n 1)"
  fi
}

run_python_import() {
  local label="$1"
  local module="$2"
  local py="${PYTHON:-python}"
  if [ -x "$ROOT/envs/python-tools/bin/python" ]; then
    py="$ROOT/envs/python-tools/bin/python"
  fi
  if ! command -v "$py" >/dev/null 2>&1; then
    printf '%s\tMISSING\t%s\n' "$label" "$py"
    return 0
  fi
  local output
  output="$("$py" -c "import ${module}; print('${module} import OK')" 2>&1)"
  local rc=$?
  if [ "$rc" -eq 0 ]; then
    printf '%s\tOK\t%s\n' "$label" "$output"
  else
    printf '%s\tBROKEN\t%s\n' "$label" "$(printf '%s' "$output" | head -n 1)"
  fi
}

run_check d2 d2 --version
run_check graphviz-dot dot -V
run_check mermaid-cli mmdc --version
run_check node node --version
run_check npm npm --version
run_check java java -version

if command -v plantuml >/dev/null 2>&1; then
  run_check plantuml plantuml -version
elif [ -n "${PLANTUML_JAR:-}" ] && [ -f "$PLANTUML_JAR" ] && command -v java >/dev/null 2>&1; then
  output="$(java -jar "$PLANTUML_JAR" -version 2>&1)"
  rc=$?
  if [ "$rc" -eq 0 ]; then
    printf '%s\tOK\t%s\n' plantuml-jar "$(printf '%s' "$output" | head -n 1)"
  else
    printf '%s\tBROKEN\t%s\n' plantuml-jar "$(printf '%s' "$output" | head -n 1)"
  fi
elif [ -f "bin/plantuml.jar" ] && command -v java >/dev/null 2>&1; then
  output="$(java -jar bin/plantuml.jar -version 2>&1)"
  rc=$?
  if [ "$rc" -eq 0 ]; then
    printf '%s\tOK\t%s\n' plantuml-jar "$(printf '%s' "$output" | head -n 1)"
  else
    printf '%s\tBROKEN\t%s\n' plantuml-jar "$(printf '%s' "$output" | head -n 1)"
  fi
else
  printf '%s\tMISSING\t%s\n' plantuml 'plantuml or plantuml.jar'
fi

run_check typst typst --version
run_check manim manim --version
run_python_import diagrams-py diagrams
