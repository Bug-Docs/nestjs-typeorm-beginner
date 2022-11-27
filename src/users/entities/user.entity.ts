import { Exclude } from 'class-transformer';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  public id!: number;

  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'text' })
  username: string;

  @Column({ type: 'text' })
  email: string;

  @Column({ type: 'string', array: true, onUpdate: 'CASCADE' })
  pronounce: string[];

  @Exclude()
  @CreateDateColumn({ type: 'timestamp with time zone', nullable: false })
  created_at!: Date;

  @Exclude()
  @UpdateDateColumn({ type: 'timestamp with time zone', nullable: true })
  updated_at?: Date | undefined;

  @DeleteDateColumn()
  deleted_at?: Date | undefined;

  @VersionColumn()
  version?: number | undefined;
}



// @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
// createdAt: Date;

// @Column({ type: 'timestamp', onUpdate: 'CURRENT_TIMESTAMP', nullable: true })
// updatedAt: Date