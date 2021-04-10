import { Entity, Column, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Lectures } from './lectures.entity';

@Entity()
export class Units extends BaseEntity {
  @Column({ type: 'varchar', nullable: false })
  title: string;

  @ManyToOne(
    type => Lectures,
    lecture => lecture.unit,
  )
  lecture: Lectures;
}
