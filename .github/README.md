# Duffel API JavaScript Client

A JavaScript client library for the Duffel API.

**Content**

- [Prerequisites](##prerequisites)
- [Install](##install)
- [CI](##client-ci)
- [How to test](##test)
- [Documentation](##documentation)

## Prerequisites

- Member of the [@duffel organisation in npm](https://www.npmjs.com/org/duffel)
- Node >= 12.22.0

## Install

```
yarn install
```

## Test

```
yarn test
```

## Lint

```
yarn lint
```

## Installation

```
yarn add @duffel/api@latest
```

If you need to create a new API operation class, just type `yarn generate:operation` and you will be prompted with a few questions. This script will create the relevant operation folder and files for you.

## Client CI

Every time we merge to main, GH will run the action by checking the commit messages with [semantic-release](https://github.com/semantic-release/semantic-release) and automatically bump the correct version to be deployed by following semver. When the deployment is done it will create a bump in our package version, using our duffel-bot, and will be auto-approved by the GH action via our auto approve workflow (`autoapprove.yml`)

### CI Flow

1. Developer opens PR to main
2. PR is merged to main
3. Our github action triggers and we analyse the commits
   a. if there's a breaking change bump major
   b. if there's a feat commit bump minor version
   c. if there's a fix only bump patch version
4. Deployment is done
   a. Publish to NPM
   b. Publish Git Tag release with relevant commits and descriptions
5. After it's published we raise a PR using a github action to create a PR with duffel-bot via personal token bumping the version inside package.json
6. Ideally we want to auto-merge this PR since it's just a chore bumping our version inside package.json
   a. If PR is from duffel-bot, then auto approve/auto-merge

## Manually Publishing

Make sure you are logged in to npm (`npm login`). After all changes have been merged to `main` run the following commands:

```
yarn build
yarn publish
```

The `yarn publish` task will ask you which version should be deployed. We follow [semantic versioning](https://www.semver.org) for this package, so bump the correct version for the changes to be published. Once this new version is deployed, make sure to commit the updated `package.json` and raise a new pull request with it.

## Documentation

If you want to know more about the project make sure to read our [Notion doc](https://www.notion.so/duffel/JS-Client-Library-Guides-c168653f674f4d768f08e8ba392702e5)
