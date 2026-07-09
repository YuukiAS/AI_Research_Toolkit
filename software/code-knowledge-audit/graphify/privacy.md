# Graphify privacy notes

Graphify-style code knowledge tools may recursively read source trees, documentation, configs, comments, and filenames. Treat them as high-risk until the exact upstream behavior is inspected.

Default policy:

- Use `templates/graphifyignore_template` before scanning any project.
- Do not scan `data/`, `datasets/`, `raw/`, `checkpoints/`, `outputs/`, `wandb/`, `logs/`, upload folders, archives, NIfTI files, model weights, pickle/HDF5 files, `.env*`, secrets, tokens, or credentials.
- Prefer a small allowlist of source and documentation paths over broad recursive scans.
- Do not send private source code to external APIs unless the user explicitly approves that data flow.
