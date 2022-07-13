import {Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import {User} from "../../user/entities/user.entity";

@Entity()
export class Question {

  @PrimaryGeneratedColumn({type: "bigint"})
  id: number;

  @Column()
  title: string;

  @Column({type: "text"})
  content: string;

  @Column({type: "float", default: 0})
  rating: number;

  @CreateDateColumn()
  created_at

  @UpdateDateColumn()
  updated_at

  @ManyToOne(() => User, (user) => user.questions)
  user: User;
}
