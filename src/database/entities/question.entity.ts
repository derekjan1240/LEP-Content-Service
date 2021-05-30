import {
  Entity,
  Column,
  OneToOne,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { BaseEntity } from './base.entity';
import { Exercise } from './exercise.entity';
import { Choice } from './choice.entity';
import { Unit } from './unit.entity';
import { Tag } from './tag.entity';

export enum QuestionType {
  CHOICE = 'choiceAnswer',
  TEXT = 'textAnswer',
}

@Entity()
export class Question extends BaseEntity {
  @Column({
    type: 'enum',
    enum: QuestionType,
    nullable: false,
  })
  type: QuestionType;

  @Column({ type: 'varchar', nullable: false, length: 50 })
  title: string;

  @Column({ type: 'varchar', nullable: true, length: 500 })
  description: string;

  @ManyToOne(() => Unit, { nullable: false })
  @JoinColumn()
  unit: Unit;

  @ManyToOne(() => Tag, { nullable: true })
  @JoinColumn()
  tag: Tag;

  @OneToMany(
    type => Choice,
    choice => choice.question,
    { nullable: true, eager: true },
  )
  choices: Choice[];

  @ManyToOne(
    type => Exercise,
    exercise => exercise.questions,
    { nullable: false },
  )
  exercise: Exercise;
}
