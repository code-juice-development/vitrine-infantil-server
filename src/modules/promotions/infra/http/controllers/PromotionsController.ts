import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreatePromotionService from '@modules/promotions/services/CreatePromotionService';
import UpdatePromotionService from '@modules/promotions/services/UpdatePromotionService';
import DeletePromotionService from '@modules/promotions/services/DeletePromotionService';
import ListPromotionsFilteredService from '@modules/promotions/services/ListPromotionsFilteredService';
import ShowPromotionService from '@modules/promotions/services/ShowPromotionService';

class PromotionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, coupon, link, description, store_id } = request.body;

    const createPromotionService = container.resolve(CreatePromotionService);

    const promotion = await createPromotionService.execute({
      name,
      coupon,
      link,
      description,
      store_id,
    });

    return response.status(201).json(promotion);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const { name, coupon, link, description, store_id } = request.body;

    const updatePromotionService = container.resolve(UpdatePromotionService);

    await updatePromotionService.execute({
      id,
      name,
      coupon,
      link,
      description,
      store_id,
    });

    return response.status(204).send();
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deletePromotionService = container.resolve(DeletePromotionService);

    await deletePromotionService.execute({ id });

    return response.status(204).send();
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const { name, page } = request.query;

    const listPromotionsFilteredService = container.resolve(
      ListPromotionsFilteredService,
    );

    const { total, promotions } = await listPromotionsFilteredService.execute({
      name: String(name ?? ''),
      page: Number(page ?? 0),
    });

    response.header('Access-Control-Expose-Headers', 'X-Total-Count');
    response.header('X-Total-Count', String(total));

    return response.json(promotions);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showPromotionsService = container.resolve(ShowPromotionService);

    const promotion = await showPromotionsService.execute({ id });

    return response.json(promotion);
  }
}

export default PromotionsController;
