import { ObjectLiteral, Repository } from 'typeorm';

import { BaseRepositoryInterface } from '@core-common/base-repository.interface';
import { objectAssign } from '@core-common/utils/object-assign';

import { BaseMapper } from './base.mapper';

export class BaseRepository<
  DomainEntity extends ObjectLiteral,
  InfraSchema extends ObjectLiteral,
> implements BaseRepositoryInterface<DomainEntity>
{
  protected readonly repository: Repository<InfraSchema>;
  protected readonly mapper: BaseMapper<DomainEntity, InfraSchema>;
  constructor(
    mapper: BaseMapper<DomainEntity, InfraSchema>,
    repository: Repository<InfraSchema>,
  ) {
    this.repository = repository;
    this.mapper = mapper;
  }

  async create(entity: Omit<DomainEntity, 'id'>): Promise<DomainEntity> {
    const newEntity = this.mapper.mapToORM(entity);
    return this.mapper.mapToDomain(await this.repository.save(newEntity));
  }

  async findById(id: number | string): Promise<DomainEntity | null> {
    if (!this.repository.metadata.propertiesMap['id']) {
      throw new Error('Repository Infrastructure Schema does not have ID');
    }

    const entity = await this.repository.findOne({
      where: {
        id,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any,
    });

    return entity ? this.mapper.mapToDomain(entity) : null;
  }

  async update(entity: DomainEntity): Promise<DomainEntity> {
    const existedEntity = await this.findById(entity['id']);
    if (!existedEntity) {
      throw new Error('Entity not found');
    }

    const combinedData = objectAssign(existedEntity, entity) as DomainEntity;
    const mappedEntityOrm = this.mapper.mapToORM(combinedData);

    return this.mapper.mapToDomain(await this.repository.save(mappedEntityOrm));
  }

  async delete(id: number | string): Promise<boolean> {
    const foundEntity = await this.findById(id);
    if (!foundEntity) {
      throw new Error('Entity not found');
    }
    return (await this.repository.delete(id)).affected !== 0;
  }
}
