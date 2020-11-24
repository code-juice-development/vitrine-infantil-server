import { Repository, getRepository, Like } from 'typeorm';

import IPromotionsRepository, {
  IPromotionsWithCount,
} from '@modules/promotions/repositories/IPromotionsRepository';
import ICreatePromotionDTO from '@modules/promotions/dtos/ICreatePromotionDTO';
import IUpdatePromotionDTO from '@modules/promotions/dtos/IUpdatePromotionDTO';

import Promotion from '@modules/promotions/infra/typeorm/entities/Promotion';

class PromotionsRepository implements IPromotionsRepository {
  private ormRepository: Repository<Promotion>;

  constructor() {
    this.ormRepository = getRepository(Promotion);
  }

  public async create({
    name,
    coupon,
    description,
    link,
    store_id,
  }: ICreatePromotionDTO): Promise<Promotion> {
    const promotion = this.ormRepository.create({
      name,
      coupon,
      description,
      link,
      store_id,
    });

    await this.ormRepository.save(promotion);

    return promotion;
  }

  public async update({
    id,
    name,
    coupon,
    description,
    link,
  }: IUpdatePromotionDTO): Promise<Promotion> {
    const promotion = this.ormRepository.create({
      id,
      name,
      coupon,
      description,
      link,
    });

    await this.ormRepository.save(promotion);

    return promotion;
  }

  public async delete(id: string): Promise<boolean> {
    const deleteResult = await this.ormRepository.delete(id);

    return deleteResult.affected !== null;
  }

  public async findById(id: string): Promise<Promotion | undefined> {
    const promotion = await this.ormRepository.findOne(id);

    return promotion;
  }

  public async findByNameWithPagination(
    name: string,
    page: number,
  ): Promise<IPromotionsWithCount> {
    const queryBuilder = this.ormRepository.createQueryBuilder('promotion');

    queryBuilder.innerJoinAndSelect('promotion.store', 'store');

    if (name) {
      queryBuilder.where({
        'promotion.name': Like(`%${name}%`),
      });
    }

    queryBuilder.orderBy('promotion.name');

    const total = await queryBuilder.getCount();

    if (page) {
      queryBuilder.skip((page - 1) * 10).take(10);
    }

    const promotions = (await queryBuilder.getMany()) || [];

    return { total, promotions };
  }

  public async findAll(): Promise<Promotion[]> {
    const promotions = (await this.ormRepository.find()) || [];

    return promotions;
  }
}

export default PromotionsRepository;
