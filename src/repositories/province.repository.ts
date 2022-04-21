import { ProvinceEntity } from 'src/entities';
import { EntityRepository, Repository } from 'typeorm';
import { FindProvinceOpt } from 'src/api/province/interface';
import {
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import {
  CreateProvinceDto,
  UpdateProvinceDto,
} from 'src/api/province/dto/province.dto';

@EntityRepository(ProvinceEntity)
export class ProvinceRepository extends Repository<ProvinceEntity> {
  async $findAndCountAll(
    opt: FindProvinceOpt,
  ): Promise<{ results: any[]; total: number; count: number }> {
    const { offset, limit, title, description } = opt;
    const q = this.createQueryBuilder('province');

    if (title)
      q.andWhere('province.title ILIKE :title', { title: `%${title}%` });
    if (description)
      q.andWhere('province.description ILIKE :description', {
        description: `%${description}%`,
      });

    // order by
    q.orderBy('province.created_at', 'DESC');
    // offset
    if (offset) q.offset(offset);
    if (limit) q.limit(limit);

    const [data, total] = await Promise.all([q.getMany(), q.getCount()]);
    const results = data;
    const count = results.length;
    return { results, total, count };
  }

  async createProvince(
    createProvinceDto: CreateProvinceDto,
  ): Promise<ProvinceEntity> {
    const { title, description } = createProvinceDto;
    try {
      const instance = await this.create({
        title,
        description,
      });
      await this.save(instance);
      return instance;
    } catch (err) {
      if (err.code === '23505') {
        throw new ConflictException('title already exist');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async getProvinceById(id: string): Promise<ProvinceEntity> {
    const province = await this.findOne({
      where: { id },
    });

    if (!province) {
      throw new NotFoundException(`Province with ID ${id} not found`);
    }
    return province;
  }
}
