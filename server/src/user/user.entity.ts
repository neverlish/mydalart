import { Field, ID, ObjectType } from "@nestjs/graphql"
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Task } from "../task/task.entity"

@ObjectType()
@Entity('user')
export class User {
  @Field(() => ID)
  @PrimaryGeneratedColumn('increment')
  id: number

  @Field(() => String)
  @Column({ unique: true })
  email: string

  @Field(() => [Task])
  @OneToMany(() => Task, (task) => task.user)
  tasks: Task[];
}
