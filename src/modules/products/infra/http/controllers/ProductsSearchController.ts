import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ListProductFilteredService from '@modules/products/services/ListProductsFilteredService';
import ShowProductService from '@modules/products/services/ShowProductService';

class ProductsSearchController {
  public async index(request: Request, response: Response): Promise<Response> {
    const {
      page,
      name,
      description,
      categories,
      gender,
      minimum_price,
      maximum_price,
      ordenation,
      stores,
    } = request.query;

    const listProductsFilteredService = container.resolve(
      ListProductFilteredService,
    );

    const { products, total } = await listProductsFilteredService.execute({
      page: Number(page ?? 1),
      ordenation: String(ordenation ?? ''),
      name: String(name ?? ''),
      description: String(description ?? ''),
      gender: String(gender ?? ''),
      minimum_price: Number(minimum_price ?? 0),
      maximum_price: Number(maximum_price ?? 0),
      categories: categories ? String(categories).split(',') : [],
      stores: stores ? String(stores).split(',') : [],
    });

    response.header('X-Total-Count', String(total));

    return response.json(products);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showProductService = container.resolve(ShowProductService);

    const product = await showProductService.execute({ id });

    return response.json(product);
  }
}

export default ProductsSearchController;
