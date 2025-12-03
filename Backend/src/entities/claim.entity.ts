import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn, Column } from 'typeorm';
import { Student } from './student.entity';
import { Gift } from './gift.entity';


@Entity()
export class Claim {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Student, { eager: true })
  @JoinColumn({ name: 'studentId' })
  student: Student;

  @ManyToOne(() => Gift, { eager: true })
  @JoinColumn({ name: 'giftId' })
  gift: Gift;

  @CreateDateColumn()
  claimedAt: Date;
}
