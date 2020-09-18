import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateProductService from '@modules/products/services/CreateProductService';
import UpdateProductService from '@modules/products/services/UpdateProductService';
import DeleteProductService from '@modules/products/services/DeleteProductService';
// import ListProductService from '@modules/products/services/ListProductsService';
import ListProductFilteredService from '@modules/products/services/ListProductsFilteredService';
import ShowProductService from '@modules/products/services/ShowProductService';

class ProductsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const {
      name,
      description,
      image,
      category,
      link,
      price,
      size,
      color,
      gender,
      store_id,
    } = request.body;

    const createProductService = container.resolve(CreateProductService);

    const product = await createProductService.execute({
      name,
      description,
      image,
      category,
      link,
      price,
      size,
      color,
      gender,
      store_id,
    });

    return response.status(201).json(product);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const {
      name,
      description,
      image,
      category,
      link,
      price,
      size,
      color,
      gender,
      store_id,
    } = request.body;

    const updateProductService = container.resolve(UpdateProductService);

    await updateProductService.execute({
      id,
      name,
      description,
      image,
      category,
      link,
      price,
      size,
      color,
      gender,
      store_id,
    });

    return response.status(204).send();
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteProductService = container.resolve(DeleteProductService);

    await deleteProductService.execute({ id });

    return response.status(204).send();
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const {
      page,
      name,
      description,
      categories,
      gender,
      minimum_price,
      maximum_price,
      stores,
    } = request.query;

    const listProductsService = container.resolve(ListProductFilteredService);

    const { products, total } = await listProductsService.execute({
      page: Number(page ?? 1),
      name: String(name ?? ''),
      description: String(description ?? ''),
      categories: categories ? String(categories).split(',') : [],
      gender: String(gender ?? ''),
      minimum_price: Number(minimum_price ?? 0),
      maximum_price: Number(maximum_price ?? 0),
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

export default ProductsController;
