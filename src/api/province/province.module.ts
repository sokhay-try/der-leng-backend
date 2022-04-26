import { Module } from '@nestjs/common';
import { ProvinceService } from './province.service';
import { ProvinceController } from './province.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlaceRepository, ProvinceRepository } from 'src/repositories';
import { UploadImageService } from '../upload-image/upload-image.service';
import {
  ImageEntity,
  PlaceImageEntity,
  ProvinceImageEntity,
} from 'src/entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProvinceRepository,
      PlaceRepository,
      ImageEntity,
      ProvinceImageEntity,
      PlaceImageEntity,
    ]),
  ],
  providers: [ProvinceService, UploadImageService],
  controllers: [ProvinceController],
})
export class ProvinceModule {}
