import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { TypeormBaseEntity } from '@core-infrastructure/database/typeorm-base.entity';

@Entity({
  name: 'employee_sessions',
})
export class EmployeeSession extends TypeormBaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  employeeId: number;

  @Column({ nullable: false, length: '256' })
  hash: string;

  @Column({ default: false })
  isLogout: boolean;
}
