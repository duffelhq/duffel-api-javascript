# Duffel API Javascript Client

Javascript client library for the Duffel API.

**Content**

- [Prerequisites](##prerequisites)
- [Install](##install)
- [Usage](##usage)
- [How to test](##test)
- [Documentation](##documentation)
- [Contributing](##contributing)

## Prerequisites

- Be part of @duffel organisation in NPM
- Node >= 12.22.0

## Install

`yarn install`

## Test

`yarn test`

## Lint

`yarn lint`

## How to use?

```
yarn add duffel-api@latest
```

If you need to create a new API operation class just type `yarn generate:operation` and you will be prompted with a few questions. The script will create the operation folder for you with the required files.

## How to publish?

Make sure you are logged in to npm (`npm login`). After getting merged to `main` do the following:
`yarn build`
`yarn publish`

It will ask what version are deploying. We follow [https://semver.org/](semantic versioning), so bump the correct version. Once it's deployed, make sure to raise a new PR with the updated package.json.

## Documentation

If you want to know more about the project make sure to read our [Notion doc](https://www.notion.so/duffel/JS-Client-Library-Guides-c168653f674f4d768f08e8ba392702e5)
