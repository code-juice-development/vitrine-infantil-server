import 'reflect-metadata';
import '@config/dotenv';

import '@shared/infra/typeorm';
import '@shared/container';

import Queue from '@shared/infra/bull/Queue';

Queue.getInstance().add('UpdateProducts', null, {
  repeat: { cron: '00 01 * * *' },
});

// eslint-disable-next-line no-console
console.log('🚀 Queue launched');
