import { DynamicModule, Module, Provider } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';

import { UserRepositoryImpl } from './persistence/user/user-impl.repository';
// !Note:  We specific import as below to avoid the error "circular dependency"
// https://github.com/nestjs/nest/issues/3555#issuecomment-562470687
import { User as UserInfrastructureEntity } from './persistence/user/user-typeorm.entity';
import { UserRepository } from './persistence/user/user.repository';
import { CoreDataTypeormConfig } from './typeorm.type';

@Module({})
export class DatabaseModule {
  static defaultEntities = [UserInfrastructureEntity];

  static forRootAsync(options: CoreDataTypeormConfig): DynamicModule {
    return {
      module: DatabaseModule,
      imports: [
        TypeOrmModule.forRootAsync({
          useFactory: async (_options) => {
            const coreDataTypeormConfig = await options.useFactory(_options);
            return {
              ...coreDataTypeormConfig.typeOrmOptions,
              entities: this.defaultEntities,
            };
          },
          inject: options.inject ?? [],
        }),
      ],
    };
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static forFeature(entities?: EntityClassOrSchema[]): DynamicModule {
    const providerDictionaries: { [key: string]: Provider } = {
      [UserInfrastructureEntity.name]: {
        provide: UserRepository,
        useClass: UserRepositoryImpl,
      },
    };

    const providers =
      //eslint-disable-next-line
      entities?.map((entity) => providerDictionaries[(entity as any).name]) ??
      [];

    return {
      module: DatabaseModule,
      providers: providers,
      exports: providers,
      imports: [TypeOrmModule.forFeature(entities)],
    };
  }
}
