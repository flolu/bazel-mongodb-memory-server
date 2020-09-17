## Setup

```
yarn install
```

## Run Tests with Plain Jasmine

```
yarn test:jasmine
```

Takes ~2 seconds

## Run Tests with Bazel

```
yarn test
```

Takes **minutes**, because [mongodb-memory-server](https://github.com/nodkz/mongodb-memory-server) always re-downloads `mongod` binaries.

And after changing + re-running the test, it downloads the binary all over again.

# Problem

## How to configure Bazel, such that it won't re-download the binaries every time?

In the [documentation](https://github.com/nodkz/mongodb-memory-server#mongodb-memory-server) they state, that the binary is stored in `node_modules/.cache/mongodb-binaries`. Thus my guess is that Bazel won't cache the `node_modules/.cache` directory.
