import { Field, ID, ObjectType } from "@nestjs/graphql"
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, Tree, TreeChildren, TreeParent } from "typeorm"
import { User } from "../user/user.entity"

@ObjectType()
@Entity('task')
@Tree('nested-set')
export class Task {
  @Field(() => ID)
  @PrimaryGeneratedColumn('increment')
  id: number

  @Field(() => Boolean)
  @Column({ type: Boolean })
  isPublic: boolean

  // TODO: Belongs to user

  @Field(() => String)
  @Column()
  text: string

  @Field(() => [Task])
  @TreeChildren()
  children: Task[]

  @Field(() => Task, { nullable: true })
  @TreeParent()
  parent: Task

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.tasks)
  user: User
}

@ObjectType()
export class TaskList {
  @Field(() => [Task])
  items: Task[]
}