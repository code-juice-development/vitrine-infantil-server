import { inject, injectable, container } from 'tsyringe';
import Parser from 'rss-parser';

import IProductsRepository from '@modules/products/repositories/IProductsRepository';

import ShowCategoryFromKeywordService from '@modules/categories/services/ShowCategoryFromKeywordService';

import { getValueFromRegex } from '@shared/utils/string';

interface IRequest {
  store_id: string;

  api: string;
}

@injectable()
class UpdateProductsFromStoreService {
  private showCategoryFromKeywordService: ShowCategoryFromKeywordService;

  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {
    this.showCategoryFromKeywordService = container.resolve(
      ShowCategoryFromKeywordService,
    );
  }

  public async execute({ store_id, api }: IRequest): Promise<void> {
    const parser = new Parser({
      customFields: { item: this.getRssCustomFields() },
    });

    await this.productsRepository.deleteByStore(store_id);

    let data;

    try {
      data = await parser.parseURL(api);
    } catch (error) {
      /** @todo inserir log de erro */
    }

    if (!data || !data.items) return;

    data.items.forEach(async (element) => {
      const name = String(element['g:title']).substr(0, 254);
      const description = String(element['g:description']).substr(0, 254);
      const link = element['g:link'];
      const image = element['g:image_link'];
      const price = getValueFromRegex(element['g:price'], '^[^a-zA-Z]*', '0');
      const size = element['g:size'];
      const color = element['g:color'] ?? 'Neutra';
      const gender = element['g:gender'] ?? 'Unissex';

      const category = getValueFromRegex(element['g:product_type'], '[^>]*$');

      const category_id = await this.getCategoryId(category);

      if (!category_id) return;

      await this.productsRepository.create({
        name,
        description,
        image,
        link,
        price,
        size,
        color,
        gender,
        category_id,
        store_id,
      });
    });
  }

  private getRssCustomFields(): Array<string> {
    return [
      'g:title',
      'g:description',
      'g:link',
      'g:image_link',
      'g:product_type',
      'g:price',
      'g:size',
      'g:color',
      'g:gender',
    ];
  }

  private async getCategoryId(keyword: string): Promise<string> {
    const category = await this.showCategoryFromKeywordService.execute({
      keyword,
    });

    return category ? category.id : '';
  }
}

export default UpdateProductsFromStoreService;
