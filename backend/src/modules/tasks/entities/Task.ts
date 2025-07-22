import {
  Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable
} from 'typeorm';
import { User } from '../../users/entities/User';

@Entity('tasks')
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string; 

  @Column({ nullable: true })
  description: string;

  @Column()
  category: string;

  @Column({ type: 'date', nullable: true })
  endDate: Date;

  @Column({
    type: 'enum',
    enum: ['pending', 'in-progress', 'done'],
    default: 'pending'
  })
  status: 'pending' | 'in-progress' | 'done';

  @ManyToOne(() => User, user => user.tasks)
  owner: User;

  @ManyToMany(() => User)
  @JoinTable()
  collaborators: User[];
}