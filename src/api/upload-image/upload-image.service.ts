import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  ImageEntity,
  PlaceImageEntity,
  ProvinceImageEntity,
} from 'src/entities';
import { Repository } from 'typeorm';
import { UploadImageDto } from './dto/upload-image.dto';

@Injectable()
export class UploadImageService {
  constructor(
    @InjectRepository(ImageEntity)
    private imgRepo: Repository<ImageEntity>,

    @InjectRepository(ProvinceImageEntity)
    private provinceImgRepo: Repository<ProvinceImageEntity>,

    @InjectRepository(PlaceImageEntity)
    private placeImgRepo: Repository<PlaceImageEntity>,
  ) {}

  uploadImage = async (uploadImageDto: UploadImageDto) => {
    const { url, ownerId, ownerTable } = uploadImageDto;

    const instances = [];
    url.forEach((imgUrl) => {
      const obj = this.imgRepo.create({ url: imgUrl });
      instances.push(obj);
    });
    await this.imgRepo.save(instances);
    console.log('>>>uploadImage', instances);

    const imgInstances = [];
    let repo;
    instances.forEach((item) => {
      if (ownerTable == 'province') {
        repo = this.provinceImgRepo;
        const proObj = this.provinceImgRepo.create({
          province_id: ownerId,
          image_id: item.id,
        });
        imgInstances.push(proObj);
      }
      if (ownerTable == 'place') {
        repo = this.placeImgRepo;
        const placeObj = this.placeImgRepo.create({
          place_id: ownerId,
          image_id: item.id,
        });
        imgInstances.push(placeObj);
      }
    });
    if (instances.length > 0) {
      await repo.save(imgInstances);
    }
  };
}
