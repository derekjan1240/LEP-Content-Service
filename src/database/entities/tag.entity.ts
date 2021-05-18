import { Entity, Column, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Unit } from './unit.entity';

@Entity()
export class Tag extends BaseEntity {
  @Column({ type: 'varchar', nullable: false })
  title: string;

  @Column({ type: 'integer', unsigned: true, nullable: false })
  time: number;

  @ManyToOne(
    type => Unit,
    unit => unit.tags,
  )
  unit: Unit;
}
