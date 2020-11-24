import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IPromotionsRepository from '@modules/promotions/repositories/IPromotionsRepository';

import Promotion from '@modules/promotions/infra/typeorm/entities/Promotion';

interface IRequest {
  id: string;
}

@injectable()
class ShowPromotionService {
  constructor(
    @inject('PromotionsRepository')
    private promotionsRepository: IPromotionsRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<Promotion> {
    const promotion = await this.promotionsRepository.findById(id);

    if (!promotion) {
      throw new AppError('Não encontrada Promoção com o ID informado');
    }

    return promotion;
  }
}

export default ShowPromotionService;
