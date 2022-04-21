import { IsNotEmpty, IsOptional, IsUUID } from 'class-validator';

export class CreatePlaceDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  provinceId: string;
}

export class UpdatePlaceDto {
  @IsNotEmpty()
  @IsUUID()
  id: string;

  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  @IsOptional()
  provinceId: string;
}

export class GetPlaceWithFilterDto {
  @IsOptional()
  title: string;

  @IsOptional()
  description: string;

  @IsOptional()
  provinceId: string;

  @IsOptional()
  page: number;

  @IsOptional()
  limit: number;

  @IsOptional()
  offset: number;
}
