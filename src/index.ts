#!/usr/bin/env node

import { Command } from 'commander'

import { archive, archives } from './lib/archive'
import { backup } from './lib/backup'
import { CLI_NAME, CLI_VERSION, setup } from './lib/config'
import { initAction } from './lib/ghaction'

const program = new Command()
program
  .name(CLI_NAME)
  .description('A CLI tool to archive webpage and it\'s screenshot to Arweave')
  .version(CLI_VERSION, '-v, --version', 'output the version number')

program
  .command('setup')
  .description('setup Arweave JWK file path')
  .argument('<jwkPath>', 'Arweave JWK file path')
  .action(setup)

program
  .command('archive')
  .description('archive url single page webpage and screenshot to Arweave')
  .argument('<url>', 'url to archive')
  .option('-j, --jwk-path <jwkPath>', 'Arweave JWK file path')
  .option(
    '-g, --gateway-url <gatewayUrl>',
    'Arweave gateway URL',
    'https://arweave.net',
  )
  .option(
    '-b, --bundler-url <bundlerUrl>',
    'Bundler URL',
    'https://node2.bundlr.network',
  )
  .action(archive)

program
  .command('archives')
  .description('display all your archives')
  .option('-j, --jwk-path <jwkPath>', 'Arweave JWK file path')
  .action(archives)

program
  .command('backup')
  .description('backup archives information')
  .argument('<path>', 'save to local path')
  .option('-j, --jwk-path <jwkPath>', 'Arweave JWK file path')
  .action(backup)

program
  .command('init-action')
  .description('initialize archive github action')
  .action(initAction)

program.parse(process.argv)
