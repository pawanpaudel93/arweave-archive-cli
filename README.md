<h1 align="center">arweave-archive-cli</h1>

A CLI tool to archive webpage and it's screenshot to [Arweave](https://arweave.org/).

- [Installation](#installation)
- [Github Actions](#github-actions)
- [Usage](#usage)
  - [Setup](#setup-arweave-jwk-path)
  - [Archive](#archive)
  - [Github Actions for Archive](#github-actions-for-archive)
- [Author](#author)
- [🤝 Contributing](#-contributing)
- [Show your support](#show-your-support)

## Installation

```sh
npm install arweave-archive-cli -g
```

OR

```sh
yarn add global arweave-archive-cli
```

Run `arweave-archive` or `aar` in terminal for more information regarding how to use the CLI.

```html
$ aar
Usage: Arweave-Archive [options] [command]

A CLI tool to archive webpage and it's screenshot to Arweave

Options:
  -v, --version            output the version number
  -h, --help               display help for command

Commands:
  setup <jwkPath>          setup Arweave JWK file path
  archive [options] <url>  archive url single page webpage and screenshot to Arweave
  archives                 display all your archives
  backup <path>            backup archives information
  init-action              initialize archive github action
  help [command]           display help for command
```

## Github Actions

1. [arweave-archive-action](https://github.com/pawanpaudel93/arweave-archive-action): Archive single page html and screenshot of websites to Arweave.

- A demo project using arweave-archive-action to capture list of urls and save it to a JSON file: [arweave-archive-cronjob](https://github.com/pawanpaudel93/arweave-archive-cronjob)

## Usage

### Setup Arweave JWK Path

Run the following command with a Arweave JWK file path.

```sh
aar setup "arweave-jwk.json"
```

### Archive

```html
Usage: Arweave-Archive archive [options] <url>

archive url single page webpage and screenshot to Arweave

Arguments:
  url                             url to archive

Options:
  -j, --jwk-path <jwkPath>        Arweave JWK file path
  -g, --gateway-url <gatewayUrl>  Arweave gateway URL (default: "https://arweave.net")
  -b, --bundler-url <bundlerUrl>  Bundler URL (default: "https://node2.bundlr.network")
  -h, --help                      display help for command
```

Run this command to save single page html and screenshot for the given url to Arweave.

```sh
aar archive https://arweave.org
```

To display all the archives made:

```sh
aar archives
```

### Github Actions for Archive

```sh
aar init-action
```

## Author

👤 **Pawan Paudel**

- Github: [@pawanpaudel93](https://github.com/pawanpaudel93)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/pawanpaudel93/arweave-archive-cli/issues).

## Show your support

Give a ⭐️ if this project helped you!

Copyright © 2023 [Pawan Paudel](https://github.com/pawanpaudel93).<br />
