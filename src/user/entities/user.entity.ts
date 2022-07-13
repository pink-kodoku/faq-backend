import {
  AfterInsert,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import {Exclude} from "class-transformer";
import {Question} from "../../question/entities/question.entity";
import Role from "./role.enum";

@Entity({name: "users"})
export class User {

  @PrimaryGeneratedColumn({type: "bigint"})
  id: number;

  @Column({unique: true})
  email: string;

  @Column()
  nickname: string;

  @Column()
  @Exclude()
  password: string;

  @Column({type: "float", default: 0})
  rating: number;

  @Column({
    type: 'enum',
    enum: Role,
    array: true,
    default: [Role.User]
  })
  public roles: Role[]

  @Exclude()
  @CreateDateColumn()
  created_at

  @Exclude()
  @UpdateDateColumn()
  updated_at

  @OneToMany(() => Question, (question) => question.user)
  questions: Question[]
}
