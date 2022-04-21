import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { PlaceEntity } from './place.entity';

@Entity('province')
export class ProvinceEntity extends BaseEntity {
  @Column({ unique: true })
  title: string;

  @Column()
  description: string;

  @OneToMany((_type) => PlaceEntity, (place) => place.province, { eager: true })
  places: PlaceEntity[];
}
