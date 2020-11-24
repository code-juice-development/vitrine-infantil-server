import { inject, injectable } from 'tsyringe';

import IPromotionsRepository from '@modules/promotions/repositories/IPromotionsRepository';

import Promotion from '@modules/promotions/infra/typeorm/entities/Promotion';

@injectable()
class ListPromotionsService {
  constructor(
    @inject('PromotionsRepository')
    private promotionsRepository: IPromotionsRepository,
  ) {}

  public async execute(): Promise<Promotion[]> {
    const promotions = await this.promotionsRepository.findAll();

    return promotions;
  }
}

export default ListPromotionsService;
