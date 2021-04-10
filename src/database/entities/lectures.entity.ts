import { Entity, Column, OneToMany, ManyToOne, JoinTable } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Subjects } from './subjects.entity';
import { Units } from './units.entity';

@Entity()
export class Lectures extends BaseEntity {
  @Column({ type: 'varchar', nullable: false })
  title: string;

  @ManyToOne(
    type => Subjects,
    subject => subject.lectures,
  )
  subject: Subjects;

  @OneToMany(
    type => Units,
    unit => unit.lecture,
    {
      eager: false,
    },
  )
  @JoinTable()
  unit: Units[];
}
