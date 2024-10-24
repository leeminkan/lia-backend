import { FactoryProvider, ModuleMetadata } from '@nestjs/common';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export type CoreDataTypeormOption = {
  typeOrmOptions: TypeOrmModuleOptions;
};

export type CoreDataTypeormConfig = Pick<ModuleMetadata, 'imports'> &
  Pick<FactoryProvider<CoreDataTypeormOption>, 'useFactory' | 'inject'>;
