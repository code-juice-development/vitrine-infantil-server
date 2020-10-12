import { inject, injectable, container } from 'tsyringe';
import Parser, { Output } from 'rss-parser';

import IProductsRepository from '@modules/products/repositories/IProductsRepository';

import ShowCategoryFromKeywordService from '@modules/categories/services/ShowCategoryFromKeywordService';
import ShowStoreService from '@modules/stores/services/ShowStoreService';
import CreateLogService from '@modules/logs/services/CreateLogService';

import { getValueFromRegex } from '@shared/utils/string';
import Store from '@modules/stores/infra/typeorm/entities/Store';

interface IRequest {
  store_id: string;

  api: string;
}

@injectable()
class UpdateProductsFromStoreService {
  private showCategoryFromKeywordService: ShowCategoryFromKeywordService;

  private showStoreService: ShowStoreService;

  private createLogService: CreateLogService;

  private store: Store;

  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {
    this.showCategoryFromKeywordService = container.resolve(
      ShowCategoryFromKeywordService,
    );
    this.showStoreService = container.resolve(ShowStoreService);
    this.createLogService = container.resolve(CreateLogService);
  }

  public async execute({ store_id, api }: IRequest): Promise<void> {
    this.store = await this.showStoreService.execute({ id: store_id });

    const data = await this.getData(api);

    if (!data || !data.items) return;

    await this.productsRepository.deleteByStore(store_id);

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

      const category_id = await this.getCategoryId(category, name);

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

  private async getData(api: string): Promise<Output | undefined> {
    const parser = new Parser({
      customFields: { item: this.getRssCustomFields() },
    });

    let data;

    try {
      data = await parser.parseURL(api);
    } catch (error) {
      this.createLogService.execute({
        name: 'Erro ao importar os Produtos',
        type: 'product',
        description: 'Houve um erro ao conectar a API',
        content: JSON.stringify(this.store),
      });
    }

    return data;
  }

  private async getCategoryId(
    keyword: string,
    productName: string,
  ): Promise<string> {
    const category = await this.showCategoryFromKeywordService.execute({
      keyword,
    });

    if (!category) {
      this.createLogService.execute({
        name: 'Erro ao importar o produto',
        type: 'product',
        description: `Não encontrado categoria correspondente`,
        content: JSON.stringify({
          store: this.store.name,
          name: productName,
          categoria: keyword,
        }),
      });

      return '';
    }

    return category.id;
  }
}

export default UpdateProductsFromStoreService;
