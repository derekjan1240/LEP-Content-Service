import { Entity, Column, OneToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Question } from './question.entity';

@Entity()
export class Exercise extends BaseEntity {
  @Column({ type: 'varchar', nullable: false, length: 50 })
  title: string;

  @Column({ type: 'varchar', nullable: true, length: 500 })
  description: string;

  @OneToMany(
    type => Question,
    question => question.exercise,
    {
      nullable: false,
      eager: true,
    },
  )
  @JoinTable()
  questions: Question[];
}
