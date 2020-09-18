import { Job, DoneCallback } from 'bull';
import { container } from 'tsyringe';

import IJob from '@shared/infra/bull/jobs/IJob';

import UpdateProductsFromStoreService from '@modules/products/services/UpdateProductsFromStoreService';

class UpdateProductsFromStoreJob implements IJob {
  public getName(): string {
    return 'UpdateProductFromStore';
  }

  public async handle(job: Job<any>, done: DoneCallback): Promise<void> {
    const { store } = job.data;

    const updateProductsFromStoreService = container.resolve(
      UpdateProductsFromStoreService,
    );

    try {
      await updateProductsFromStoreService.execute({
        store_id: store.id,
        api: store.api,
      });
    } catch (error) {
      done(error, { message: 'Job completed with error' });
    }

    done(null, { message: 'Job completed with success' });
  }
}

export default UpdateProductsFromStoreJob;
