// Environment-only adapter: use the already available Chromium binary.
// No Mica source, fixture, assertion, or build is changed.
const path = require('node:path');
const { chromium } = require(path.join(process.env.CODEX_PRIMARY_RUNTIME_NODE_MODULES, 'playwright'));
chromium.executablePath = () => '/tmp/architecture-browser/chrome-linux64/chrome';
