import ICreatePromotionDTO from '@modules/promotions/dtos/ICreatePromotionDTO';
import IUpdatePromotionDTO from '@modules/promotions/dtos/IUpdatePromotionDTO';

import Promotion from '@modules/promotions/infra/typeorm/entities/Promotion';

export interface IPromotionsWithCount {
  total: number;
  promotions: Promotion[];
}

interface IPromotionsRepository {
  create(data: ICreatePromotionDTO): Promise<Promotion>;

  update(data: IUpdatePromotionDTO): Promise<Promotion>;

  delete(id: string): Promise<boolean>;

  findById(id: string): Promise<Promotion | undefined>;

  findByNameWithPagination(
    name: string,
    page: number,
  ): Promise<IPromotionsWithCount>;

  findAll(): Promise<Promotion[]>;
}

export default IPromotionsRepository;
