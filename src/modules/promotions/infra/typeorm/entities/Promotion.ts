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

@Entity('promotions')
class Promotion {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  coupon: string;

  @Column()
  link: string;

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

export default Promotion;
