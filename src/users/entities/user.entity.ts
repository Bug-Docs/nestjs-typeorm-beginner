import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  public id!: number;

  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'text' })
  username: string;

  @Column({ type: 'text' })
  email: string;
}
