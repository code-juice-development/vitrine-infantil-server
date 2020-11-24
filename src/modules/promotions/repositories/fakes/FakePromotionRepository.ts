import { v4 } from 'uuid';

import IPromotionsRepository, {
  IPromotionsWithCount,
} from '@modules/promotions/repositories/IPromotionsRepository';

import ICreatePromotionDTO from '@modules/promotions/dtos/ICreatePromotionDTO';
import IUpdatePromotionDTO from '@modules/promotions/dtos/IUpdatePromotionDTO';

import Promotion from '@modules/promotions/infra/typeorm/entities/Promotion';

class FakePromotionRepository implements IPromotionsRepository {
  private promotions: Promotion[] = [];

  public async create({
    name,
    description,
    coupon,
    link,
    store_id,
  }: ICreatePromotionDTO): Promise<Promotion> {
    const promotion = new Promotion();

    Object.assign(
      promotion,
      { id: v4() },
      { name, description, coupon, link, store_id },
    );

    this.promotions.push(promotion);

    return promotion;
  }

  public async update({
    id,
    name,
    description,
    coupon,
    link,
    store_id,
  }: IUpdatePromotionDTO): Promise<Promotion> {
    const promotion = this.promotions.find(
      (promotionFind) => promotionFind.id === id,
    );

    Object.assign(promotion, { name, description, coupon, link, store_id });

    return promotion ?? new Promotion();
  }

  public async delete(id: string): Promise<boolean> {
    const findIndex = this.promotions.findIndex(
      (promotion) => promotion.id === id,
    );

    this.promotions.splice(findIndex, 1);

    return true;
  }

  public async findById(id: string): Promise<Promotion | undefined> {
    const promotion = this.promotions.find(
      (promotionFind) => promotionFind.id === id,
    );

    return promotion;
  }

  public async findByNameWithPagination(
    _name: string,
    _page: number,
  ): Promise<IPromotionsWithCount> {
    throw new Error('Method not implemented.');
  }

  public async findAll(): Promise<Promotion[]> {
    return this.promotions;
  }
}
export default FakePromotionRepository;
