import Bull from 'bull';

import UpdateProductsJob from '@modules/products/infra/bull/jobs/UpdateProductsJob';
import UpdateProductsFromStoreJob from '@modules/products/infra/bull/jobs/UpdateProductsFromStoreJob';

import IJob from '@shared/infra/bull/jobs/IJob';

class Queue {
  private jobs: Array<IJob>;

  private queues: Array<Bull.Queue>;

  private static instance: Queue;

  private constructor() {
    this.jobs = [new UpdateProductsJob(), new UpdateProductsFromStoreJob()];

    this.init();
  }

  public static getInstance(): Queue {
    if (!this.instance) {
      this.instance = new Queue();
    }
    return this.instance;
  }

  public getQueues(): Array<Bull.Queue> {
    return this.queues;
  }

  private init() {
    this.queues = this.jobs.map((job) => {
      const queue = new Bull(job.getName(), {
        redis: {
          port: Number(process.env.REDIS_PORT),
          host: String(process.env.REDIS_HOST),
          password: String(process.env.REDIS_PASSWORD),
        },
      });

      queue.process(job.handle);

      return queue;
    });
  }

  public async add(
    name: string,
    data: any,
    options: any,
  ): Promise<Bull.Job | undefined> {
    const queue = this.queues.find((queueFind) => queueFind.name === name);

    return queue?.add(data, options);
  }
}

export default Queue;
