import { Entity, Column, OneToMany, ManyToOne, JoinTable } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Grade } from './grade.entity';
import { Subject } from './subject.entity';
import { Unit } from './unit.entity';

@Entity()
export class Lecture extends BaseEntity {
  @Column({ type: 'integer', unsigned: true, nullable: false })
  order: number;

  @Column({ type: 'varchar', nullable: false })
  title: string;

  @ManyToOne(
    type => Subject,
    subject => subject.lectures,
  )
  subject: Subject;

  @ManyToOne(
    type => Grade,
    grade => grade.lectures,
  )
  grade: Grade;

  @OneToMany(
    type => Unit,
    unit => unit.lecture,
    {
      eager: true,
    },
  )
  @JoinTable()
  units: Unit[];
}
