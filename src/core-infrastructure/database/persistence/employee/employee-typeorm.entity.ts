import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { TypeormBaseEntity } from '@core-infrastructure/database/typeorm-base.entity';

@Entity({
  name: 'employees',
})
export class Employee extends TypeormBaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 32 })
  username: string;

  @Column({ type: 'varchar', length: 256 })
  password: string;
}
