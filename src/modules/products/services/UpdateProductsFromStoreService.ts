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
      const name = this.treatNameValue(element['g:title']);
      const description = this.treatDescriptionValue(element['g:description']);
      const link = element['g:link'];
      const image = element['g:image_link'];
      const price = this.treatPriceValue(element['g:price']);
      const size = element['g:size'];
      const color = this.treatColorValue(element['g:color']);
      const gender = this.treatGenderValue(element['g:gender']);
      const category = this.treatCategoryValue(element['g:product_type']);

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

  private async getData(api: string): Promise<Output | undefined> {
    const parser = new Parser({
      customFields: {
        item: [
          'g:title',
          'g:description',
          'g:link',
          'g:image_link',
          'g:product_type',
          'g:price',
          'g:size',
          'g:color',
          'g:gender',
        ],
      },
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

  private treatNameValue(name: string): string {
    return String(name).substr(0, 254);
  }

  private treatDescriptionValue(description: string): string {
    return String(description).substr(0, 254);
  }

  private treatColorValue(color: string): string {
    return color ?? 'Neutra';
  }

  private treatPriceValue(price: string): string {
    return getValueFromRegex(price, '^[^a-zA-Z]*', '0');
  }

  private treatGenderValue(gender: string): string {
    switch (gender.toLowerCase()) {
      case 'male':
        return 'Masculino';
      case 'masculino':
        return 'Masculino';
      case 'female':
        return 'Feminino';
      case 'feminino':
        return 'Feminino';
      default:
        return 'Unisex';
    }
  }

  private treatCategoryValue(category: string): string {
    return getValueFromRegex(category, '[^>]*$');
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
