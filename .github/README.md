# Duffel API JavaScript Client

A JavaScript client library for the Duffel API.

**Content**

- [Prerequisites](##prerequisites)
- [Install](##install)
- [Usage](##usage)
- [How to test](##test)
- [Documentation](##documentation)
- [Contributing](##contributing)

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
yarn add duffel-api@latest
```

If you need to create a new API operation class, just type `yarn generate:operation` and you will be prompted with a few questions. This script will create the relevant operation folder and files for you.

## Publishing

Make sure you are logged in to npm (`npm login`). After all changes have been merged to `main` run the following commands:
```
yarn build
yarn publish
```

The `yarn publish` task will ask you which version should be deployed. We follow [https://semver.org/](semantic versioning) for this package, so bump the correct version for the changes to be published. Once this new version is deployed, make sure to commit the updated `package.json` and raise a new pull request with it.

## Documentation

If you want to know more about the project make sure to read our [Notion doc](https://www.notion.so/duffel/JS-Client-Library-Guides-c168653f674f4d768f08e8ba392702e5)
