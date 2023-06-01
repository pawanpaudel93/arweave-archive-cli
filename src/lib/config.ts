import path from 'node:path'

import Conf from 'conf'

// @ts-expect-error declaration missing
import { getCollection, getDB, initDB } from 'lokijs-promise'
import { Logger } from 'tslog'

import { checkFileExists } from './utils'

export const CLI_NAME = 'Arweave-Archive'
export const CLI_VERSION = '0.1.0'

export const logger: Logger = new Logger({
  name: 'arweave-archive',
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

export async function getDb() {
  const config = getConfig()
  initDB(
    path.resolve(path.dirname(path.resolve(config.path)), 'database.json'),
    4000,
  )
  return await getDB()
}

export async function getDbData(type?: string) {
  const db = await getDb()
  let collection = await getCollection(type)
  collection = collection.find()
  let output: (string | boolean)[]
  if (collection.length > 0) {
    output = [
      JSON.stringify(
        collection.map(
          (archive: {
            id: string
            url: string
            title: string
            webpage: string
            screenshot: string
            timestamp: number
          }) => ({
            id: archive.id,
            url: archive.url,
            title: archive.title,
            webpage: archive.webpage,
            screenshot: archive.screenshot,
            timestamp: archive.timestamp,
          }),
        ),
        null,
        2,
      ),
      true,
    ]
  }
  else {
    output = [`No ${type} yet.`, false]
  }
  db.close()
  return output
}
