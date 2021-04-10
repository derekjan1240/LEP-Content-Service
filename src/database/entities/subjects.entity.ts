import { Entity, Column, OneToMany, ManyToOne, JoinTable } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Grades } from './grades.entity';
import { Lectures } from './lectures.entity';

@Entity()
export class Subjects extends BaseEntity {
  @Column({ type: 'varchar', nullable: false })
  title: string;

  @Column({ default: false })
  isSyllabus: boolean;

  @Column({ default: false })
  isExam: boolean;

  @ManyToOne(
    type => Grades,
    grade => grade.subjects,
  )
  grade: Grades;

  @OneToMany(
    type => Lectures,
    lecture => lecture.subject,
    {
      eager: true,
    },
  )
  @JoinTable()
  lectures: Lectures[];
}
