import { ArweaveArchiver } from 'arweave-archive'

import { getJWK, logger } from './config'
import { getErrorMessage, joinUrl } from './utils'

export async function archive(
  url: string,
  options: { jwkPath?: string; gatewayUrl: string; bundlerUrl: string },
) {
  try {
    logger.info(`Archiving url: ${url}.`)
    const jwk = await getJWK(options?.jwkPath)
    const archiver = new ArweaveArchiver(jwk, {
      gatewayUrl: options.gatewayUrl,
      bundlerUrl: options.bundlerUrl,
    })
    const { status, message, txID, title, timestamp } = await archiver.archiveUrl(
      url,
    )
    if (status === 'success') {
      const webpage = joinUrl(options.gatewayUrl, txID)
      const screenshot = joinUrl(options.gatewayUrl, `${txID}/screenshot`)

      const archivedData = {
        id: txID,
        url,
        title,
        webpage,
        screenshot,
        timestamp,
      }
      logger.info(`${url} archived.`)
      console.log(archivedData)
    }
    else {
      logger.error(message)
    }
  }
  catch (error) {
    logger.error(getErrorMessage(error))
  }
}

export async function archives(options: { jwkPath?: string }) {
  try {
    const jwk = await getJWK(options.jwkPath)
    const archiver = new ArweaveArchiver(jwk)
    const archives = await archiver.getAllArchives()
    console.log(archives)
  }
  catch (error) {
    logger.error(getErrorMessage(error))
  }
}
