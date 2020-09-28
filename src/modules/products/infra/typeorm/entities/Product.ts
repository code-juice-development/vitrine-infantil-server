import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import Store from '@modules/stores/infra/typeorm/entities/Store';
import Category from '@modules/categories/infra/typeorm/entities/Category';

@Entity('products')
class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  image: string;

  @Column()
  link: string;

  @Column({ type: 'real' })
  price: string;

  @Column()
  size: string;

  @Column()
  color: string;

  @Column()
  gender: string;

  @Column()
  category_id: string;

  @ManyToOne((_type) => Category, (category) => category.products, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'category_id', referencedColumnName: 'id' })
  category: Category;

  @Column()
  store_id: string;

  @ManyToOne((_type) => Store, (store) => store.products, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'store_id', referencedColumnName: 'id' })
  store: Store;

  @CreateDateColumn()
  created_at: string;

  @UpdateDateColumn()
  updated_at: string;
}

export default Product;
