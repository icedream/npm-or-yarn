# Yarn or NPM tools

This is just a bunch of tools that detect at runtime whether they are being run from npm or yarn, adapt respectively and then execute the requested program with the correct parameters.

## `yon`

This command line tool runs NPM by default, unless it is being called from Yarn in some way, e.g. as part of a package script. Then it converts the input parameters to how Yarn expects them.
Using this tool allows to avoid an extra dependency on another package manager so if a user decides to use just NPM or just Yarn they won't need to install the other package manager just to get your project running.

This tool expects arguments as you would pass them to `npm`.

```js
{
  // ...
  "scripts": {
    "prepublish": "yon run -s build",
    "install": "...",
    // ...
  },
  // ...
}
```

## `yon-lerna`

This command line tool makes Lerna use Yarn's own package mechanisms (specifically workspaces) when it detects that it is being run from Yarn instead of NPM. This is most useful in monolithic source code trees.

This tool expects arguments as you would pass them if `npm` was present.

```js
{
  // ...
  "scripts": {
    "postinstall": "yon-lerna bootstrap",
    "build": "yon-lerna run --stream build",
    // ...
  },
  // ...
}
```
