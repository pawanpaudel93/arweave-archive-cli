import fsPromises from 'node:fs/promises'
import { ArweaveArchiver } from 'arweave-archive'

import { getJWK, logger } from './config'
import { getErrorMessage } from './utils'

export async function backup(path: string, options: { jwkPath?: string }) {
  logger.info(`Saving to ${path}.`)
  try {
    const jwk = await getJWK(options.jwkPath)
    const archive = new ArweaveArchiver(jwk)
    const archives = await archive.getAllArchives()
    await fsPromises.writeFile(path, JSON.stringify(archives, null, 4))
    logger.info('Saved!!!')
  }
  catch (error) {
    logger.error(getErrorMessage(error))
  }
}
