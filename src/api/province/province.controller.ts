import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ImageEntity, ProvinceEntity } from 'src/entities';
import { UploadImageService } from '../upload-image/upload-image.service';
import {
  CreateProvinceDto,
  GetProvinceWithFilterDto,
  UpdateProvinceDto,
} from './dto/province.dto';
import { ProvinceService } from './province.service';

@Controller('api/province')
export class ProvinceController {
  constructor(
    private provinceSV: ProvinceService,
    private imgSV: UploadImageService,
  ) {}

  @Get()
  async getProvinces(
    @Query() getProvinceWithFilterDto: GetProvinceWithFilterDto,
  ): Promise<{ results: any[]; total: number; count: number }> {
    return await this.provinceSV.getProvinces(getProvinceWithFilterDto);
  }

  @Get('/:id/images')
  async getProvinceImages(@Param('id') id: string): Promise<[ImageEntity]> {
    return await this.provinceSV.getProvinceImages(id);
  }

  @Post()
  async createProvince(
    @Body() createProvinceDto: CreateProvinceDto,
  ): Promise<ProvinceEntity> {
    const { images } = createProvinceDto;
    const prov = await this.provinceSV.createProvince(createProvinceDto);
    await this.imgSV.uploadImage({
      ownerId: prov.id,
      url: images,
      ownerTable: 'province',
    });
    return prov;
  }

  @Put()
  async updateProvince(
    @Body() updateProvinceDto: UpdateProvinceDto,
  ): Promise<ProvinceEntity> {
    const { images } = updateProvinceDto;
    const prov = await this.provinceSV.updateProvince(updateProvinceDto);
    await this.imgSV.uploadImage({
      ownerId: prov.id,
      url: images,
      ownerTable: 'province',
    });
    return prov;
  }

  @Delete('/:id')
  deleteTask(@Param('id') id: string): Promise<void> {
    return this.provinceSV.deleteProvince(id);
  }
}
