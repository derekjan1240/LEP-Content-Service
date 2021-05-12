import { Entity, Column, OneToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Grade } from './grade.entity';

@Entity()
export class Stage extends BaseEntity {
  @Column({ type: 'varchar', nullable: false })
  title: string;

  @OneToMany(
    type => Grade,
    grade => grade.stage,
    {
      eager: false,
    },
  )
  @JoinTable()
  grades: Grade[];
}
