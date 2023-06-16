import { Archive } from 'arweave-archive'

import { getJWK, logger } from './config'
import { getErrorMessage, joinUrl } from './utils'

export async function archive(
  url: string,
  options: { jwkPath?: string; gatewayUrl: string; bundlerUrl: string },
) {
  try {
    logger.info(`Archiving url: ${url}.`)
    const jwk = await getJWK(options?.jwkPath)
    const archive = new Archive(jwk, {
      gatewayUrl: options.gatewayUrl,
      bundlerUrl: options.bundlerUrl,
    })
    const { status, message, txID, title, timestamp } = await archive.archiveUrl(
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
      const stringifiedData = JSON.stringify(archivedData, null, 4)
      logger.info(`${url} archived.\n ${stringifiedData}`)
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
    const archive = new Archive(jwk)
    const archives = await archive.getAllArchives()
    console.log(archives)
  }
  catch (error) {
    logger.error(getErrorMessage(error))
  }
}
