import { Request, Response } from 'express';

import Queue from '@shared/infra/bull/Queue';

class ProductsUpdateController {
  public async create(
    _request: Request,
    response: Response,
  ): Promise<Response> {
    Queue.getInstance().add('UpdateProducts', {}, {});

    return response
      .status(201)
      .json({ message: 'Created Job for update Products' });
  }
}

export default ProductsUpdateController;
