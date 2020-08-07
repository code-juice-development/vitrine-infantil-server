import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateProductService from '@modules/products/services/CreateProductService';
import UpdateProductService from '@modules/products/services/UpdateProductService';
import DeleteProductService from '@modules/products/services/DeleteProductService';
import ListProductService from '@modules/products/services/ListProductsService';
import ShowProductService from '@modules/products/services/ShowProductService';
import UpdateStoreService from '@modules/stores/services/UpdateStoreService';

class ProductsController {

  public async create(request: Request, response: Response): Promise<Response> {
    const {
      name, 
      description,
      image,
      category,
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
      price,
      size,
      color,
      gender,
      store_id,
    });

    return response.status(201).json(product);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const {
      id,
    } = request.params;

    const {
      name, 
      description,
      image,
      category,
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
      price,
      size,
      color,
      gender,
      store_id,
    });

    return response.status(204).send();
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const {
      id,
    } = request.params;

    const deleteProductService = container.resolve(DeleteProductService);

    await deleteProductService.execute({ id });

    return response.status(204).send();
  }

  public async index(request: Request, response: Response): Promise<Response> {

    return response.json();
  }

  public async show(request: Request, response: Response): Promise<Response> {

    return response.json();
  }

};

export default ProductsController;