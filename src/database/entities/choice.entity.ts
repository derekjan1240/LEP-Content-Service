import { Entity, Column, ManyToOne, JoinTable } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Question } from './question.entity';

@Entity()
export class Choice extends BaseEntity {
  @Column({ type: 'varchar', nullable: false })
  title: string;

  @Column({ type: 'boolean', nullable: false })
  isCorrectAnswer: boolean;

  @ManyToOne(
    type => Question,
    question => question.choices,
    { nullable: false },
  )
  question: Question;
}
