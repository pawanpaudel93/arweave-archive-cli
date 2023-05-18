import fs from 'fs';
import fsPromises from 'fs/promises';
import path from 'path';

import prompts from 'prompts';

import { logger } from './config';
import { checkFileExists, getErrorMessage } from './utils';

export const initAction = async () => {
  try {
    const response = await prompts({
      type: 'text',
      name: 'value',
      message:
        'Cron Expression for schedule. Default runs everyday at 00:00 AM',
      initial: '0 0 * * *',
      validate: (value: string) =>
        typeof value === 'string' && value.trim() !== ''
          ? true
          : 'Cron Expression is Required',
    });
    if (!response.value) throw Error(`Cron Expression is Required!!!`);
    logger.info('Saving Archive github action...');
    const savePath = '.github/workflows/';
    let ARCHIVE_ACTION = (
      await fsPromises.readFile(
        path.join(
          path.dirname(fs.realpathSync(__dirname)),
          'actions/archive.yml'
        )
      )
    ).toString();

    if (!(await checkFileExists(savePath))) {
      await fsPromises.mkdir(savePath, {
        recursive: true,
      });
    }
    ARCHIVE_ACTION = ARCHIVE_ACTION.replace(/CRON_EXPRESSION/g, response.value);
    await fsPromises.writeFile(savePath + 'archive.yml', ARCHIVE_ACTION);
    logger.info(
      '\n' +
        [
          '1. Set github action secrets with key JWK for Arweave wallet JWK',
        ].join('\n')
    );
    logger.info('Saved successfully.');
  } catch (error) {
    logger.error(getErrorMessage(error));
  }
};
