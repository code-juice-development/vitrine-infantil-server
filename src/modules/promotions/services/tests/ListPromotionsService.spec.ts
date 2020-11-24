import FakePromotionRepository from '@modules/promotions/repositories/fakes/FakePromotionRepository';

import ListPromotionsService from '@modules/promotions/services/ListPromotionsService';

let fakePromotionsRepository: FakePromotionRepository;
let listPromotionsService: ListPromotionsService;

describe('List Promotions Service', () => {
  beforeEach(() => {
    fakePromotionsRepository = new FakePromotionRepository();
    listPromotionsService = new ListPromotionsService(fakePromotionsRepository);
  });

  it('should be able to list all Promotions', async () => {
    const promotionModaLove = await fakePromotionsRepository.create({
      name: 'Cupom Moda Love',
      coupon: 'MODALOVE10',
      description: 'Aplique seu cupom digitando no carrinho de compras',
      link: 'https://www.modalove.com.br',
      store_id: '3caab81c-dee9-4883-b108-17838493b094',
    });

    const promotionLaLuna = await fakePromotionsRepository.create({
      name: 'Cupom La Luna',
      coupon: 'LALUNA15',
      description: 'Aplique seu cupom digitando no carrinho de compras',
      link: 'https://www.laluna.com.br',
      store_id: '3caab81c-d45a-4883-byt8-17838s5e6094',
    });

    const stores = await listPromotionsService.execute();

    expect(stores).toContain(promotionModaLove);
    expect(stores).toContain(promotionLaLuna);
  });
});
