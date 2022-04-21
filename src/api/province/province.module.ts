import { Module } from '@nestjs/common';
import { ProvinceService } from './province.service';
import { ProvinceController } from './province.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlaceRepository, ProvinceRepository } from 'src/repositories';

@Module({
  imports: [TypeOrmModule.forFeature([ProvinceRepository, PlaceRepository])],
  providers: [ProvinceService],
  controllers: [ProvinceController],
})
export class ProvinceModule {}
