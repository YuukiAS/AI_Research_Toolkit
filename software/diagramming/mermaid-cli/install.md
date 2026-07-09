# Install Mermaid CLI

Install status: unknown.

User-level npm option:

```bash
mkdir -p envs/npm-prefix
npm config set prefix "$PWD/envs/npm-prefix"
npm install -g @mermaid-js/mermaid-cli
```

Verify:

```bash
mmdc --version
```

Headless Linux may require Chromium configuration.
