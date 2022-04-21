import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity('province_image')
export class ProvinceImageEntity extends BaseEntity {
  @Column({ type: 'uuid' })
  province_id: string;

  @Column({ type: 'uuid' })
  image_id: string;
}
