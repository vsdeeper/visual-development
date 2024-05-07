# visual-development

Tools for visual development through abstract configuration.

## Develop

Install dependencies
```
pnpm install
```

Develop components
```
pnpm dev
```

## Publish

- Run `pnpm build` command to build single page application, run `pnpm build:lib` command to build lib.

  When build lib, continue: 
- Run `pnpm changeset` command and fill in the basic information.
- Run `pnpm changeset version` command to generate changelog information (CHANGELOG.md).
- Run `pnpm release` command to publish the selected package.

## Todo
