import { inject, injectable } from 'tsyringe';

import IPromotionsRepository from '@modules/promotions/repositories/IPromotionsRepository';

interface IRequest {
  id: string;
}

@injectable()
class DeletePromotionService {
  constructor(
    @inject('PromotionsRepository')
    private promotionsRepository: IPromotionsRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<void> {
    await this.promotionsRepository.delete(id);
  }
}

export default DeletePromotionService;
