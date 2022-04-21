import { FindPlaceOpt } from 'src/api/place/interface';
import { PlaceEntity } from 'src/entities';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(PlaceEntity)
export class PlaceRepository extends Repository<PlaceEntity> {
  async $findAndCountAll(
    opt: FindPlaceOpt,
  ): Promise<{ results: any[]; total: number; count: number }> {
    const { offset, limit, title, description, provinceId } = opt;
    const q = this.createQueryBuilder('place');

    if (title) q.andWhere('place.title ILIKE :title', { title: `%${title}%` });
    if (provinceId)
      q.andWhere('place.provinceId  =:provinceId', { provinceId });
    if (description)
      q.andWhere('place.description ILIKE :description', {
        description: `%${description}%`,
      });

    // order by
    q.orderBy('place.created_at', 'DESC');
    // offset
    if (offset) q.offset(offset);
    if (limit) q.limit(limit);

    const [data, total] = await Promise.all([q.getMany(), q.getCount()]);
    const results = data;
    const count = results.length;
    return { results, total, count };
  }
}
