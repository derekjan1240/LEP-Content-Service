import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity()
export class Units extends BaseEntity {
  @Column({ type: 'varchar', nullable: false })
  title: number;
}
