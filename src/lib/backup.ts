import fsPromises from 'node:fs/promises'

import { getDbData, logger } from './config'
import { getErrorMessage } from './utils'

export async function saveToLocal(path: string) {
  const [data, dataPresent] = await getDbData('archives')
  if (dataPresent)
    await fsPromises.writeFile(path, data as string)

  return [data, dataPresent]
}

export async function backup(path: string) {
  logger.info(`Saving to ${path}.`)
  try {
    const [data, dataPresent] = await saveToLocal(path)
    if (!dataPresent)
      logger.info(data)
    else logger.info('Saved!!!')
  }
  catch (error) {
    logger.error(getErrorMessage(error))
  }
}
