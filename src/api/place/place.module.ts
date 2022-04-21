import { Module } from '@nestjs/common';
import { PlaceService } from './place.service';
import { PlaceController } from './place.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlaceRepository, ProvinceRepository } from 'src/repositories';

@Module({
  imports: [TypeOrmModule.forFeature([PlaceRepository, ProvinceRepository])],
  providers: [PlaceService],
  controllers: [PlaceController],
})
export class PlaceModule {}
