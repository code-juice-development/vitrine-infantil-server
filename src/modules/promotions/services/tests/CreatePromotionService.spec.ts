import FakePromotionRepository from '@modules/promotions/repositories/fakes/FakePromotionRepository';

import CreatePromotionService from '@modules/promotions/services/CreatePromotionService';

let fakePromotionsRepository: FakePromotionRepository;
let createPromotionService: CreatePromotionService;

describe('Create Promotion Service', () => {
  beforeEach(() => {
    fakePromotionsRepository = new FakePromotionRepository();
    createPromotionService = new CreatePromotionService(
      fakePromotionsRepository,
    );
  });

  it('should be able to create a new Promotion', async () => {
    const promotion = await createPromotionService.execute({
      name: 'Cupom Moda Love',
      coupon: 'MODALOVE10',
      description: 'Aplique seu cupom digitando no carrinho de compras',
      link: 'https://www.modalove.com.br',
      store_id: '3caab81c-dee9-4883-b108-17838493b094',
    });

    expect(promotion).toHaveProperty('id');
  });
});
