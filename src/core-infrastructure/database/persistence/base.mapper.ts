export abstract class BaseMapper<DomainEntity, InfrastructureEntity> {
  abstract mapToORM(userEntity: Omit<DomainEntity, 'id'>): InfrastructureEntity;

  abstract mapToDomain(
    userInfraEntity: InfrastructureEntity,
    additionalFields?: Record<string, unknown>,
  ): DomainEntity;
}
