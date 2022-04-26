import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ImageEntity, ProvinceEntity } from 'src/entities';
import { ProvinceRepository, PlaceRepository } from 'src/repositories';
import { paginationBuilder } from 'src/utils';
import {
  CreateProvinceDto,
  GetProvinceWithFilterDto,
  UpdateProvinceDto,
} from './dto/province.dto';

@Injectable()
export class ProvinceService {
  constructor(
    @InjectRepository(ProvinceRepository)
    private provinceRepo: ProvinceRepository,

    @InjectRepository(PlaceRepository)
    private placeRepo: PlaceRepository,
  ) {}

  async getProvinces(
    getProvinceWithFilterDto: GetProvinceWithFilterDto,
  ): Promise<{ results: any[]; total: number; count: number }> {
    const { limit, offset } = paginationBuilder({
      page: getProvinceWithFilterDto.page,
      limit: getProvinceWithFilterDto.page_size,
    });
    const { results, total, count } = await this.provinceRepo.$findAndCountAll({
      ...getProvinceWithFilterDto,
      offset,
      limit,
    });
    return { results, total, count };
  }

  async getProvinceImages(id): Promise<[ImageEntity]> {
    return await this.provinceRepo.getProvinceImages(id);
  }

  async getProvinceById(id: string): Promise<ProvinceEntity> {
    const found = await this.provinceRepo.findOne({ where: { id } });
    if (!found) {
      throw new NotFoundException(`Province with ID ${id} not found`);
    }
    return found;
  }

  async createProvince(
    createProvinceDto: CreateProvinceDto,
  ): Promise<ProvinceEntity> {
    return this.provinceRepo.createProvince(createProvinceDto);
  }

  async updateProvince(
    updateProvinceDto: UpdateProvinceDto,
  ): Promise<ProvinceEntity> {
    const { description, title, id } = updateProvinceDto;
    const instance = await this.getProvinceById(id);
    instance.title = title;
    instance.description = description;
    await this.provinceRepo.save(instance);
    return instance;
  }

  async deleteProvince(id: string) {
    // delete all place that belong to it
    const places = await this.placeRepo.find({ where: { province: id } });
    await this.placeRepo.remove(places);

    const result = await this.provinceRepo.delete({ id });
    if (result.affected === 0) {
      throw new NotFoundException(`Province with ID ${id} not found`);
    }
  }
}
