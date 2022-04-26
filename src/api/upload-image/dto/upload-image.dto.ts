import { IsNotEmpty } from 'class-validator';

export class UploadImageDto {
  @IsNotEmpty()
  url: [string];

  @IsNotEmpty()
  ownerId: string;

  @IsNotEmpty()
  ownerTable: string;
}
