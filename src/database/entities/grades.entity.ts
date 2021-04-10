import { Entity, Column, OneToMany, ManyToOne, JoinTable } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Stages } from './stages.entity';
import { Subjects } from './subjects.entity';

@Entity()
export class Grades extends BaseEntity {
  @Column({ type: 'varchar', nullable: false })
  title: string;

  @ManyToOne(
    type => Stages,
    stage => stage.grades,
  )
  stage: Stages;

  @OneToMany(
    type => Subjects,
    subject => subject.grade,
    {
      eager: true,
    },
  )
  @JoinTable()
  subjects: Subjects[];
}
