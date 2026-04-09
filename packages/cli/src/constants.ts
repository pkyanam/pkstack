// GSTACK_VERSION — pin the gstack release installed into scaffolded projects.
// To bump: open a PR updating this constant and include the gstack release notes.
export const GSTACK_VERSION = '0.16.1.0'

export const TEMPLATE_VERSION = '0.2.0'

export const GSTACK_TARBALL_URL = (version: string) =>
  `https://github.com/garrytan/gstack/archive/refs/tags/v${version}.tar.gz`

export const GSTACK_INSTALL_SUBDIR = '.claude/skills/gstack'
export const GSTACK_GLOBAL_DIR = `${process.env['HOME'] ?? '~'}/.claude/skills/gstack`
