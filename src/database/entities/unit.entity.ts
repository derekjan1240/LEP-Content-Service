import { Entity, Column, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Lecture } from './lecture.entity';

@Entity()
export class Unit extends BaseEntity {
  @Column({ type: 'varchar', nullable: false })
  title: string;

  @ManyToOne(
    type => Lecture,
    lecture => lecture.units,
  )
  lecture: Lecture;
}
