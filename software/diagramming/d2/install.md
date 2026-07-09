# Install D2

Install status: unknown.

User-level options, no sudo:

```bash
# Go-based install, if Go is available and GOPATH/GOBIN points to a user-writable path.
go install oss.terrastruct.com/d2@latest

# Or download an upstream release into bin/ after manual checksum review.
```

Verify:

```bash
d2 --version
```
