import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  ImageEntity,
  PlaceImageEntity,
  ProvinceImageEntity,
} from 'src/entities';
import { UploadImageService } from './upload-image.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ImageEntity,
      ProvinceImageEntity,
      PlaceImageEntity,
    ]),
  ],
  controllers: [],
  providers: [UploadImageService],
})
export class UploadImageModule {}
