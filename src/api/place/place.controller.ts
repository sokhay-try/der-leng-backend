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
import { PlaceEntity } from 'src/entities';
import {
  CreatePlaceDto,
  GetPlaceWithFilterDto,
  UpdatePlaceDto,
} from './dto/place.dto';
import { PlaceService } from './place.service';

@Controller('api/place')
export class PlaceController {
  constructor(private placeSV: PlaceService) {}

  @Get()
  async getPlaces(
    @Query() getPlaceWithFilterDto: GetPlaceWithFilterDto,
  ): Promise<{ results: any[]; total: number; count: number }> {
    return this.placeSV.getPlaces(getPlaceWithFilterDto);
  }

  @Post()
  createPlace(@Body() createPlaceDto: CreatePlaceDto): Promise<PlaceEntity> {
    return this.placeSV.createPlace(createPlaceDto);
  }

  @Put()
  updatePlace(@Body() updatePlaceDto: UpdatePlaceDto): Promise<PlaceEntity> {
    return this.placeSV.updatePlace(updatePlaceDto);
  }

  @Delete('/:id')
  deletePlace(@Param('id') id: string): Promise<void> {
    return this.placeSV.deletePlace(id);
  }
}
