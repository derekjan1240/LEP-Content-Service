import { Entity, Column, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Classroom } from '../entities/classroom.entity';

@Entity()
export class StudentGroup extends BaseEntity {
  @Column({ type: 'varchar', nullable: false, length: 50 })
  name: string;

  @Column({ type: 'varchar', nullable: false })
  members: string;

  @ManyToOne(
    type => Classroom,
    classroom => classroom.studentGroups,
    { nullable: true },
  )
  classroom: Classroom;
}
