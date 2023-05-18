import { Archive } from 'arweave-archive';

import { getConfig, getDb, getDbData, logger } from './config';
import { getErrorMessage, joinUrl } from './utils';

export const archive = async (
  url: string,
  options: { jwkPath?: string; gatewayUrl: string; bundlerUrl: string }
) => {
  logger.info(`Archiving url: ${url}.`);
  const config = getConfig();
  const jwk = options?.jwkPath ?? (config.get('jwkPath') as string);
  if (!jwk) {
    logger.error('Arweave JWK path not setup or passed.');
    return;
  }
  const archive = new Archive(jwk, options.gatewayUrl, options.bundlerUrl);
  const { status, message, txID, title, timestamp } = await archive.archiveUrl(
    url
  );
  if (status === 'success') {
    const db = await getDb();
    const webpage = joinUrl(options.gatewayUrl, txID);
    const screenshot = joinUrl(options.gatewayUrl, `${txID}/screenshot`);
    let archives = db.getCollection('archives');
    if (archives === null) {
      archives = db.addCollection('archives');
    }
    const archivedData = {
      id: txID,
      url,
      title,
      webpage,
      screenshot,
      timestamp,
    };
    const stringifiedData = JSON.stringify(archivedData, null, 4);
    logger.info(`${url} archived.\n ${stringifiedData}`);
    archives.insert(archivedData);
    db.close();
  } else {
    logger.error(message);
  }
};

export const archives = async () => {
  try {
    const data = await getDbData('archives');
    console.log(data[0]);
  } catch (error) {
    logger.error(getErrorMessage(error));
  }
};
