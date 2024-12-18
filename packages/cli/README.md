# @sewell_stephens/late-ui

A CLI for adding components to your project.

## Usage

Use the `init` command to initialize dependencies for a new project.

The `init` command installs dependencies, adds the `cn` util, configures `tailwind.config.js`, and CSS variables for the project.

```bash
npx @sewell_stephens/late-ui@latest init
```

## add

Use the `add` command to add components to your project.

The `add` command adds a component to your project and installs all required dependencies.

```bash
npx @sewell_stephens/late-ui@latest add [component]
```

### Example

```bash
npx @sewell_stephens/late-ui@latest add paragraph-element
```

You can also run the command without any arguments to view a list of all available components:

```bash
npx @sewell_stephens/late-ui@latest add
```

## Documentation

Visit https://sewellstephens.github.io/late/docs to view the documentation.

## License

[MIT](./LICENSE)
