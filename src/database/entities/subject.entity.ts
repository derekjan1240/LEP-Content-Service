import { Entity, Column, OneToMany, ManyToOne, JoinTable } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Grade } from './grade.entity';
import { Lecture } from './lecture.entity';

@Entity()
export class Subject extends BaseEntity {
  @Column({ type: 'varchar', nullable: false })
  title: string;

  @Column({ default: false })
  isSyllabus: boolean;

  @Column({ default: false })
  isExam: boolean;

  // @ManyToOne(
  //   type => Grade,
  //   grade => grade.subjects,
  // )
  // grade: Grade;

  @OneToMany(
    type => Lecture,
    lecture => lecture.subject,
    {
      eager: true,
    },
  )
  @JoinTable()
  lectures: Lecture[];
}
