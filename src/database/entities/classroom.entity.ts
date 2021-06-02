import { Entity, Column, OneToMany, JoinTable, OneToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { StudentGroup } from './studentGroup.entity';

@Entity()
export class Classroom extends BaseEntity {
  @Column({ type: 'varchar', nullable: false, length: 50 })
  name: string;

  @Column({ type: 'varchar', nullable: true, length: 500 })
  description: string;

  @Column({ type: 'boolean', nullable: false, default: true })
  isAllowAdd: boolean;

  @Column({ type: 'varchar', nullable: false })
  manager: string;

  @OneToMany(
    type => StudentGroup,
    studentGroup => studentGroup.classroom,
    {
      nullable: false,
      eager: true,
    },
  )
  @JoinTable()
  studentGroups: StudentGroup[];

  @Column({ type: 'varchar', nullable: true })
  studentList: string;
}
