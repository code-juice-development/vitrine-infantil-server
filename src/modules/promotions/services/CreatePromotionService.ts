import { inject, injectable } from 'tsyringe';

import IPromotionsRepository from '@modules/promotions/repositories/IPromotionsRepository';

import Promotion from '@modules/promotions/infra/typeorm/entities/Promotion';

interface IRequest {
  name: string;

  coupon: string;

  description: string;

  link: string;

  store_id: string;
}

@injectable()
class CreatePromotionService {
  constructor(
    @inject('PromotionsRepository')
    private promotionsRepository: IPromotionsRepository,
  ) {}

  public async execute({
    name,
    coupon,
    description,
    link,
    store_id,
  }: IRequest): Promise<Promotion> {
    const promotion = await this.promotionsRepository.create({
      name,
      coupon,
      description,
      link,
      store_id,
    });

    return promotion;
  }
}

export default CreatePromotionService;
