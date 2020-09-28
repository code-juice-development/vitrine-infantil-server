import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateCategoryService from '@modules/categories/services/CreateCategoryService';
import UpdateCategoryService from '@modules/categories/services/UpdateCategoryService';
import DeleteCategoryService from '@modules/categories/services/DeleteCategoryService';
import ListCategoriesService from '@modules/categories/services/ListCategoriesService';
import ShowCategoryService from '@modules/categories/services/ShowCategoryService';

class CategoriesController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, description, keywords } = request.body;

    const createCategoryService = container.resolve(CreateCategoryService);

    const category = await createCategoryService.execute({
      name,
      description,
      keywords,
    });

    return response.status(201).json(category);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name, description, keywords } = request.body;

    const updateCategoryService = container.resolve(UpdateCategoryService);

    await updateCategoryService.execute({
      id,
      name,
      description,
      keywords,
    });

    return response.status(204).send();
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteCategoryService = container.resolve(DeleteCategoryService);

    await deleteCategoryService.execute({ id });

    return response.status(204).send();
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const listCategoriesService = container.resolve(ListCategoriesService);

    const categories = await listCategoriesService.execute();

    return response.json(categories);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showCategoryService = container.resolve(ShowCategoryService);

    const category = await showCategoryService.execute({ id });

    return response.json(category);
  }
}

export default CategoriesController;
