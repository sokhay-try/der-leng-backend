import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PlaceEntity } from 'src/entities';
import { PlaceRepository, ProvinceRepository } from 'src/repositories';
import { paginationBuilder } from 'src/utils';
import {
  CreatePlaceDto,
  GetPlaceWithFilterDto,
  UpdatePlaceDto,
} from './dto/place.dto';

@Injectable()
export class PlaceService {
  constructor(
    @InjectRepository(PlaceRepository) private placeRepo: PlaceRepository,
    @InjectRepository(ProvinceRepository)
    private provinceRepo: ProvinceRepository,
  ) {}

  async getPlaces(
    getPlaceWithFilterDto: GetPlaceWithFilterDto,
  ): Promise<{ results: any[]; total: number; count: number }> {
    const { limit, offset } = paginationBuilder({
      page: getPlaceWithFilterDto.page,
      limit: getPlaceWithFilterDto.page_size,
    });
    const { results, total, count } = await this.placeRepo.$findAndCountAll({
      ...getPlaceWithFilterDto,
      offset,
      limit,
    });
    return { results, total, count };
  }

  async getPlaceById(id: string): Promise<PlaceEntity> {
    const found = await this.placeRepo.findOne({ where: { id } });
    if (!found) {
      throw new NotFoundException(`Place with ID ${id} not found`);
    }
    return found;
  }

  async createPlace(createPlaceDto: CreatePlaceDto): Promise<PlaceEntity> {
    const { title, description, provinceId } = createPlaceDto;
    const province = await this.provinceRepo.getProvinceById(provinceId);

    const instance = await this.placeRepo.create({
      title,
      description,
      province,
    });

    await this.placeRepo.save(instance);
    return instance;
  }

  async updatePlace(updatePlaceDto: UpdatePlaceDto): Promise<PlaceEntity> {
    const { description, title, id, provinceId } = updatePlaceDto;
    const instance = await this.getPlaceById(id);
    instance.title = title;
    instance.description = description;

    if (provinceId) {
      const province = await this.provinceRepo.getProvinceById(provinceId);
      instance.province = province;
    }
    await this.placeRepo.save(instance);
    return instance;
  }

  async deletePlace(id: string) {
    const result = await this.placeRepo.delete({ id });
    if (result.affected === 0) {
      throw new NotFoundException(`Place with ID ${id} not found`);
    }
  }
}
