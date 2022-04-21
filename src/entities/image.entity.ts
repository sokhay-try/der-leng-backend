import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity('image')
export class ImageEntity extends BaseEntity {
  @Column()
  url: string;
}
