export abstract class BaseMapper<DomainEntity, InfrastructureEntity> {
  abstract mapToORM(
    employeeEntity: Omit<DomainEntity, 'id'>,
  ): InfrastructureEntity;

  abstract mapToDomain(
    employeeInfraEntity: InfrastructureEntity,
    additionalFields?: Record<string, unknown>,
  ): DomainEntity;
}
