import { Entity, Column, OneToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Grades } from './grades.entity';

@Entity()
export class Stages extends BaseEntity {
  @Column({ type: 'varchar', nullable: false })
  title: string;

  @OneToMany(
    type => Grades,
    grade => grade.stage,
    {
      eager: true,
    },
  )
  @JoinTable()
  grades: Grades[];
}
