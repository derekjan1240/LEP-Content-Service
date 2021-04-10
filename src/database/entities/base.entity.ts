import {
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';

export abstract class BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'boolean', select: false, default: true })
  isActive: boolean;

  @Column({ type: 'boolean', select: false, default: false })
  isArchived: boolean;

  @CreateDateColumn({
    type: 'timestamp',
    select: false,
    default: () => 'CURRENT_TIMESTAMP',
  })
  createDateTime: Date;

  @Column({ type: 'varchar', select: false, length: 300 })
  createdBy: string;

  @UpdateDateColumn({
    type: 'timestamp',
    select: false,
    default: () => 'CURRENT_TIMESTAMP',
  })
  lastChangedDateTime: Date;

  @Column({ type: 'varchar', select: false, length: 300 })
  lastChangedBy: string;

  @Column({ type: 'varchar', select: false, length: 300, nullable: true })
  internalComment: string | null;
}
