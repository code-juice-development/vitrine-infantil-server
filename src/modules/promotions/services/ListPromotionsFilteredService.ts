import { inject, injectable } from 'tsyringe';

import IPromotionsRepository from '@modules/promotions/repositories/IPromotionsRepository';

import Promotion from '@modules/promotions/infra/typeorm/entities/Promotion';

interface IRequest {
  name: string;

  page: number;
}

interface IResponse {
  total: number;

  promotions: Promotion[];
}

@injectable()
class ListPromotionsFilteredService {
  constructor(
    @inject('PromotionsRepository')
    private promotionsRepository: IPromotionsRepository,
  ) {}

  public async execute({ name, page }: IRequest): Promise<IResponse> {
    const {
      total,
      promotions,
    } = await this.promotionsRepository.findByNameWithPagination(name, page);

    return { total, promotions };
  }
}

export default ListPromotionsFilteredService;
