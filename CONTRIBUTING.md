# Contribution guide

## Setup

1. Make sure you have the correct version of Node installed. If you use [`nvm`](https://github.com/nvm-sh/nvm), run `nvm use`. If you use [`asdf`](https://github.com/asdf-vm/asdf), run `asdf install`.
1. Make sure you have `yarn ^1.0.0` installed: `npm install --global yarn`
1. Install dependencies with `yarn`

## Run locally

Use `yarn dev` to run in dev mode.

See `package.json` for other scripts that can be run (e.g. linters).

## Committing code

We use [commitlint](https://github.com/conventional-changelog/commitlint) to lint our commit messages. If your commit message doesn't fit this format, it'll be rejected by a pre-commit hook.
