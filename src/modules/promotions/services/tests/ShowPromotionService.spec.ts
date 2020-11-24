import AppError from '@shared/errors/AppError';

import FakePromotionRepository from '@modules/promotions/repositories/fakes/FakePromotionRepository';

import ShowPromotionService from '@modules/promotions/services/ShowPromotionService';

let fakePromotionRepository: FakePromotionRepository;
let showPromotionService: ShowPromotionService;

describe('Show Promotion Service', () => {
  beforeEach(() => {
    fakePromotionRepository = new FakePromotionRepository();
    showPromotionService = new ShowPromotionService(fakePromotionRepository);
  });

  it('should be able to show Store', async () => {
    const promotion = await fakePromotionRepository.create({
      name: 'Cupom Moda Love',
      coupon: 'MODALOVE10',
      description: 'Aplique seu cupom digitando no carrinho de compras',
      link: 'https://www.modalove.com.br',
      store_id: '3caab81c-dee9-4883-b108-17838493b094',
    });

    const findStore = await showPromotionService.execute({ id: promotion.id });

    expect(promotion).toEqual(findStore);
  });

  it('should not be able to show a nonexistent Promotion', async () => {
    expect(
      showPromotionService.execute({
        id: 'nonexistent-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
