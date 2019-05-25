# isolex Out-of-Tree Example

This is an example service (that doesn't do much) for [the isolex bot](https://github.com/ssube/isolex).

## What is an out-of-tree service?

Services are classes instantiated and managed by the bot, passed configuration and lifecycle events. Most services
live in the same repository (git tree) as the app's `main` function.

With https://github.com/ssube/isolex/pull/305, the bot is able to `require` JS modules and load services from outside
of the original source. This allows developers to build modules without recompiling the entire bot and third-parties to
release their own modules without forking the bot.

## How do out-of-tree schemas work?

Services are created by the bot, based on metadata in the config file. The `BotService` constructor takes a schema key
against which to validate the config data before the service is started. Most services use schema objects in the
`isolex#/definitions` path, but out-of-tree services need to provide their own schema and key.

To provide a schema, the module should fetch it from the DI container with `container.create(INJECT_SCHEMA)` and call
`addSchema` with a partial schema (which can reference the existing `isolex` schema). Schemas are currently global and
top-level names can conflict, but should be made module-specific.

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