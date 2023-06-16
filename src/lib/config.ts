import Conf from 'conf'

import { Logger } from 'tslog'

import { checkFileExists } from './utils'

export const CLI_NAME = 'Arweave-Archive'
export const CLI_VERSION = '0.1.0'

export const logger: Logger = new Logger({
  name: 'arweave-archive-cli',
  displayFilePath: 'hidden',
  displayFunctionName: false,
  displayDateTime: false,
})

export function getConfig() {
  return new Conf({
    projectName: CLI_NAME,
    projectVersion: CLI_VERSION,
  })
}

export async function setup(jwkPath: string) {
  if (!(await checkFileExists(jwkPath))) {
    logger.error('JWK file doesn\'t exist.')
    return
  }
  logger.info('Saving Arweave JWK file path.')
  const config = getConfig()

  config.set('jwkPath', jwkPath)

  logger.info('Saved Arweave JWK file path.')
}

export async function getJWK(jwkPath?: string) {
  const config = getConfig()
  if (jwkPath)
    await setup(jwkPath)

  const jwk = config.get('jwkPath') as string
  if (!jwk)
    throw new Error('Arweave JWK path not setup or passed.')
  return jwk
}
