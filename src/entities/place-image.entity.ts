import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity('place_image')
export class PlaceImageEntity extends BaseEntity {
  @Column({ type: 'uuid' })
  place_id: string;

  @Column({ type: 'uuid' })
  image_id: string;
}
