import FakePromotionRepository from '@modules/promotions/repositories/fakes/FakePromotionRepository';

import UpdatePromotionService from '@modules/promotions/services/UpdatePromotionService';

let fakePromotionRepository: FakePromotionRepository;
let updatePromotionService: UpdatePromotionService;

describe('Create Store Service', () => {
  beforeEach(() => {
    fakePromotionRepository = new FakePromotionRepository();
    updatePromotionService = new UpdatePromotionService(
      fakePromotionRepository,
    );
  });

  it('should be able to create a new Store', async () => {
    const promotion = await fakePromotionRepository.create({
      name: 'Cupom Moda Love',
      coupon: 'MODALOVE10',
      description: 'Aplique seu cupom digitando no carrinho de compras',
      link: 'https://www.modalove.com.br',
      store_id: '3caab81c-dee9-4883-b108-17838493b094',
    });

    const updatedPromotion = await updatePromotionService.execute({
      id: promotion.id,
      name: 'Cupom La Luna',
      coupon: 'LALUNA15',
      description: 'Aplique seu cupom digitando no carrinho de compras, né',
      link: 'https://www.laluna.com.br',
      store_id: '3caab81c-d45a-4883-byt8-17838s5e6094',
    });

    expect(updatedPromotion.id).toBe(promotion.id);
    expect(updatedPromotion.name).toBe('Cupom La Luna');
    expect(updatedPromotion.coupon).toBe('LALUNA15');
    expect(updatedPromotion.description).toBe(
      'Aplique seu cupom digitando no carrinho de compras, né',
    );
    expect(updatedPromotion.link).toBe('https://www.laluna.com.br');
    expect(updatedPromotion.store_id).toBe(
      '3caab81c-d45a-4883-byt8-17838s5e6094',
    );
  });
});
