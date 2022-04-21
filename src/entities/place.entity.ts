import { Exclude } from 'class-transformer';
import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { ProvinceEntity } from './province.entity';

@Entity('place')
export class PlaceEntity extends BaseEntity {
  @Column({ unique: true })
  title: string;

  @Column()
  description: string;

  @ManyToOne((_type) => ProvinceEntity, (province) => province.places)
  @Exclude({ toPlainOnly: true })
  province: ProvinceEntity;
}
