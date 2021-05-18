import { Entity, Column, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Lecture } from './lecture.entity';

@Entity()
export class Unit extends BaseEntity {
  @Column({ type: 'integer', unsigned: true, nullable: false })
  order: number;

  @Column({ type: 'varchar', nullable: false })
  title: string;

  @ManyToOne(
    type => Lecture,
    lecture => lecture.units,
  )
  lecture: Lecture;
}
