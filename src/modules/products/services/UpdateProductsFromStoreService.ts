import { inject, injectable } from 'tsyringe';
import Parser from 'rss-parser';

import IProductsRepository from '@modules/products/repositories/IProductsRepository';

interface IRequest {

  store_id: string;

  api: string;

};

@injectable()
class UpdateProductsFromStoreService {

  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository
  ) {}

  public async execute({ store_id, api }: IRequest): Promise<void> {
    const parser = new Parser({ customFields: { item: this.getRssCustomFields() }});

    await this.productsRepository.deleteByStore(store_id);

    const data = await parser.parseURL(api);
    
    if(!data || !data.items) return;
    
    data.items.forEach(async (element) => {
      if(!element) return;
      
      const name = String(element['g:title']).substr(0, 254);
      const description = String(element['g:description']).substr(0, 254);
      const link = element['g:link'];
      const image = element['g:image_link'];
      const category = String(new RegExp('[^>]*$').exec(element['g:product_type'] ?? '')![1] ?? '').trim();
      const price = String(new RegExp('^[^a-zA-Z]*').exec(element['g:price'] ?? '')![1] ?? 0).trim();
      const size = element['g:size'];
      const color = element['g:color'];
      const gender = element['g:gender'];

      await this.productsRepository.create({
        name, 
        description,
        image,
        category,
        link,
        price,
        size,
        color,
        gender,
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

};

export default UpdateProductsFromStoreService;
