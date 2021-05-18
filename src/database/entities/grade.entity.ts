import {
  Entity,
  Column,
  OneToMany,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { BaseEntity } from './base.entity';
import { Lecture } from './lecture.entity';
import { Stage } from './stage.entity';
import { Subject } from './subject.entity';

@Entity()
export class Grade extends BaseEntity {
  @Column({ type: 'integer', unsigned: true, nullable: false })
  order: number;

  @Column({ type: 'varchar', nullable: false })
  title: string;

  @ManyToOne(
    type => Stage,
    stage => stage.grades,
  )
  stage: Stage;

  // @OneToMany(
  //   type => Subject,
  //   subject => subject.grade,
  //   {
  //     eager: true,
  //   },
  // )
  // @JoinTable()
  // subjects: Subject[];

  @ManyToMany(type => Subject)
  @JoinTable()
  subjects: Subject[];

  @OneToMany(
    type => Lecture,
    lecture => lecture.grade,
    {
      eager: false,
    },
  )
  @JoinTable()
  lectures: Lecture[];
}
