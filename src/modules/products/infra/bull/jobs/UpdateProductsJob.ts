import { Job, DoneCallback } from 'bull';
import { container } from 'tsyringe';

import IJob from '@shared/infra/bull/jobs/IJob';

import UpdateProductsFromStoreService from '@modules/products/services/UpdateProductsFromStoreService';
import ListStoresService from '@modules/stores/services/ListStoresService';

class UpdateProductsJob implements IJob {

  public getName(): string {
    return 'UpdateProducts';
  }
  
  public async handle(job: Job<any>, done: DoneCallback): Promise<void> {
    const listStoresService = container.resolve(ListStoresService);
    const updateProductsFromStoreService = container.resolve(UpdateProductsFromStoreService);

    const stores = await listStoresService.execute();

    const progress = 100 / stores.length;

    try {
      for (const store of stores) {
        await updateProductsFromStoreService.execute({ store_id: store.id, api: store.api });

        job.progress(job.progress() + progress);
      }
    } 
    catch (error) {
      done(error, { message: 'Job completed with error' }); return;
    }
      
    done(null, { message: 'Job completed with success' });
  }

};

export default UpdateProductsJob;