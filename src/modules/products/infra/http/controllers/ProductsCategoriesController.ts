import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProductsCategoriesService from '@modules/products/services/ListProductsCategoriesService';

class ProductsCategoriesController {
  public async index(_request: Request, response: Response): Promise<Response> {
    const listProductsCategoriesService = container.resolve(
      ListProductsCategoriesService,
    );

    const categories = await listProductsCategoriesService.execute();

    return response.json(categories);
  }
}

export default ProductsCategoriesController;
