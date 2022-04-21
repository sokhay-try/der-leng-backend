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
import { ProvinceEntity } from 'src/entities';
import {
  CreateProvinceDto,
  GetProvinceWithFilterDto,
  UpdateProvinceDto,
} from './dto/province.dto';
import { ProvinceService } from './province.service';

@Controller('api/province')
export class ProvinceController {
  constructor(private provinceSV: ProvinceService) {}

  @Get()
  async getProvinces(
    @Query() getProvinceWithFilterDto: GetProvinceWithFilterDto,
  ): Promise<{ results: any[]; total: number; count: number }> {
    return await this.provinceSV.getProvinces(getProvinceWithFilterDto);
  }

  @Post()
  createProvince(
    @Body() createProvinceDto: CreateProvinceDto,
  ): Promise<ProvinceEntity> {
    return this.provinceSV.createProvince(createProvinceDto);
  }

  @Put()
  updateProvince(
    @Body() updateProvinceDto: UpdateProvinceDto,
  ): Promise<ProvinceEntity> {
    return this.provinceSV.updateProvince(updateProvinceDto);
  }

  @Delete('/:id')
  deleteTask(@Param('id') id: string): Promise<void> {
    return this.provinceSV.deleteProvince(id);
  }
}
