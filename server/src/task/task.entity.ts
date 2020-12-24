import { Field, ID, ObjectType } from "@nestjs/graphql"
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, Tree, TreeChildren, TreeParent } from "typeorm"
import { User } from "../user/user.entity"

@ObjectType('TaskDetail')
@Entity('task')
@Tree('nested-set')
export class Task {
  @Field(() => ID)
  @PrimaryGeneratedColumn('increment')
  id: number

  @Field(() => Boolean)
  @Column({ type: Boolean })
  isPublic: boolean

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
class TaskListBaseItem {
  @Field(() => ID)
  id: number

  @Field(() => String)
  text: string
}

@ObjectType()
class TaskListItem extends TaskListBaseItem {
  @Field(() => User)
  user: User

  @Field(() => [TaskListBaseItem])
  children: TaskListBaseItem[]
}

@ObjectType()
export class TaskList {
  @Field(() => [TaskListItem])
  items: TaskListItem[]
}