# Install Graphviz

Install status: unknown.

Graphviz is often provided by the system. Without sudo, prefer an existing module, conda environment, or user-managed package environment.

```bash
conda create -p envs/graphviz graphviz -c conda-forge
conda run -p envs/graphviz dot -V
```

Do not use sudo from this toolkit.
