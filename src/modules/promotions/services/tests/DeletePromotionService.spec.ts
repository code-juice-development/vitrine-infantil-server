import FakePromotionRepository from '@modules/promotions/repositories/fakes/FakePromotionRepository';

import DeletePromotionService from '@modules/promotions/services/DeletePromotionService';

let fakePromotionsRepository: FakePromotionRepository;
let deletePromotionsService: DeletePromotionService;

describe('Delete Promotion Service', () => {
  beforeEach(() => {
    fakePromotionsRepository = new FakePromotionRepository();
    deletePromotionsService = new DeletePromotionService(
      fakePromotionsRepository,
    );
  });

  it('should be able to delete a Promotion', async () => {
    const promotion = await fakePromotionsRepository.create({
      name: 'Cupom Moda Love',
      coupon: 'MODALOVE10',
      description: 'Aplique seu cupom digitando no carrinho de compras',
      link: 'https://www.modalove.com.br',
      store_id: '3caab81c-dee9-4883-b108-17838493b094',
    });

    const { id } = promotion;

    await deletePromotionsService.execute({ id });

    const findStore = await fakePromotionsRepository.findById(id);

    expect(findStore).toEqual(undefined);
  });
});
