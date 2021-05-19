import { Entity, Column, ManyToOne, OneToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Lecture } from './lecture.entity';
import { Tag } from './tag.entity';

@Entity()
export class Unit extends BaseEntity {
  @Column({ type: 'integer', unsigned: true, nullable: false })
  order: number;

  @Column({ type: 'varchar', nullable: false })
  title: string;

  @Column({ type: 'varchar', nullable: false })
  youtube_id: string;

  @Column({ type: 'varchar', nullable: false })
  description: string;

  @OneToMany(
    type => Tag,
    tag => tag.unit,
    {
      eager: true,
    },
  )
  @JoinTable()
  tags: Tag[];

  @ManyToOne(
    type => Lecture,
    lecture => lecture.units,
    {
      eager: false,
    },
  )
  lecture: Lecture;
}
