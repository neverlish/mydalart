import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Column, Entity, PrimaryGeneratedColumn, Tree, TreeChildren, TreeParent } from "typeorm";

@ObjectType()
@Entity('task')
@Tree('nested-set')
export class Task {
  @Field(() => ID)
  @PrimaryGeneratedColumn('increment')
  id: number;

  // TODO: Belongs to user

  @Field(() => String)
  @Column()
  text: string;

  @Field(() => [Task])
  @TreeChildren()
  children: Task[]

  @Field(() => Task, { nullable: true })
  @TreeParent()
  parent: Task;
}