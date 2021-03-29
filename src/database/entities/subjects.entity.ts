import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity()
export class Subjects extends BaseEntity {
  @Column({ type: 'varchar', nullable: false })
  title: number;

  @Column({ default: false })
  isSyllabus: boolean;

  @Column({ default: false })
  isExam: boolean;
}
