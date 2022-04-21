import { IsNotEmpty, IsOptional, IsUUID } from 'class-validator';

export class CreateProvinceDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;
}

export class UpdateProvinceDto extends CreateProvinceDto {
  @IsNotEmpty()
  @IsUUID()
  id: string;
}

export class GetProvinceWithFilterDto {
  @IsOptional()
  title: string;

  @IsOptional()
  description: string;

  @IsOptional()
  page: number;

  @IsOptional()
  limit: number;

  @IsOptional()
  offset: number;
}
