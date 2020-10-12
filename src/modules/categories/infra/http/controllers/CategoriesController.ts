import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateCategoryService from '@modules/categories/services/CreateCategoryService';
import UpdateCategoryService from '@modules/categories/services/UpdateCategoryService';
import DeleteCategoryService from '@modules/categories/services/DeleteCategoryService';
import ListCategoriesFilteredService from '@modules/categories/services/ListCategoriesFilteredService';
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
    const { name, page } = request.query;

    const listCategoriesService = container.resolve(
      ListCategoriesFilteredService,
    );

    const { total, categories } = await listCategoriesService.execute({
      name: String(name ?? ''),
      page: Number(page ?? 0),
    });

    response.header('Access-Control-Expose-Headers', 'X-Total-Count');
    response.header('X-Total-Count', String(total));

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
