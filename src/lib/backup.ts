import fsPromises from 'fs/promises';

import { getDbData, logger } from './config';
import { getErrorMessage } from './utils';

export const saveToLocal = async (path: string) => {
  const [data, dataPresent] = await getDbData('archives');
  if (dataPresent) {
    await fsPromises.writeFile(path, data as string);
  }
  return [data, dataPresent];
};

export const backup = async (path: string) => {
  logger.info(`Saving to ${path}.`);
  try {
    const [data, dataPresent] = await saveToLocal(path);
    if (!dataPresent) {
      logger.info(data);
    } else {
      logger.info('Saved!!!');
    }
  } catch (error) {
    logger.error(getErrorMessage(error));
  }
};
