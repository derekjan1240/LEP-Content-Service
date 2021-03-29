import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity()
export class Lectures extends BaseEntity {
  @Column({ type: 'varchar', nullable: false })
  title: number;
}
