# isolex Out-of-Tree Example

This is an example service (that doesn't do much) for [the isolex bot](https://github.com/ssube/isolex).

## What is an out-of-tree service?

Services are classes instantiated and managed by the bot, passed configuration and lifecycle events. Most services
live in the same repository (git tree) as the app's `main` function.

With https://github.com/ssube/isolex/pull/305, the bot is able to `require` JS modules and load services from outside
of the original source. This allows service developers to test services without recompiling the entire bot and publish
service images based on the bot image (using docker's `FROM`).

## How do out-of-tree schemas work?

Services are created by the bot, based on metadata in the config file. The `BotService` constructor takes a schema key
against which to validate the config data before the service is started. Most services use schema objects in the
`isolex#/definitions` path, but out-of-tree services need to provide their own schema and key.

To provide a schema, the module should fetch it from the DI container with `container.create(INJECT_SCHEMA)` and call
`addSchema` with a partial schema (which can reference the existing `isolex` schema). Schemas are currently global and
top-level names can conflict, but should be made module-specific.

## How is this service installed?

During development, the best way to install an out-of-tree service is with `yarn link`. The service repo must have
a valid `package.json` for this to work.

In the service repo, run `yarn link`. It will print a message with the package name, like:

```
yarn link v1.13.0
success Registered "isolex-oot-example".
info You can now run `yarn link "isolex-oot-example"` in the projects where you want to use this package and it will be used instead.
```

In the isolex repo, run `yarn link "isolex-oot-example"` to install your module and service.

For production, the service module should be published to a registry and installed with
`yarn add isolex-oot-example@x.y.z`.

When creating a docker image, either method can be used, with the module `COPY`'d into the image before being linked.

## How is this service configured?

This service does not implement any real functionality, but does implement the basic methods to be registered as a
parser:

```yml
metadata:
  kind: bot
  name: isolex
data:
  parsers:
    - metadata:
        kind: example-service
        name: test-example-service
      data:
        foo: bar
```

## Is the interface stable?

**No.**

Some necessary classes and symbols from the bot are currently exported via webpack's library feature as the global
variable `isolex`. This requires re-exporting classes from https://github.com/ssube/noicejs and loses the namespace
for anything exported. A better way is needed to pass these base classes to external modules.