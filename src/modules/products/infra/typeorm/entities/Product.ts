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

@Entity('products')
class Product {
  
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  image: string;

  @Column()
  category: string;

  @Column()
  price: number;

  @Column()
  size: string;

  @Column()
  color: string;

  @Column()
  gender: string;

  @Column()
  store_id: string;

  @ManyToOne(() => Store)
  @JoinColumn({ name: 'store_id' })
  store: Store;

  @CreateDateColumn()
  created_at: string;

  @UpdateDateColumn()
  updated_at: string;

};

export default Product;