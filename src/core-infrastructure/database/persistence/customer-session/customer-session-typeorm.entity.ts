import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { TypeormBaseEntity } from '@core-infrastructure/database/typeorm-base.entity';

@Entity({
  name: 'customer_sessions',
})
export class CustomerSession extends TypeormBaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  customerId: number;

  @Column({ nullable: false, length: '256' })
  hash: string;

  @Column({ default: false })
  isLogout: boolean;
}
