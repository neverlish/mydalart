import { Column, Entity, PrimaryGeneratedColumn, Tree, TreeChildren, TreeParent } from "typeorm";

@Entity('task')
@Tree('nested-set')
export class Task {
  @PrimaryGeneratedColumn('increment')
  id: number;

  // TODO: Belongs to user

  @Column()
  text: string;

  @TreeChildren()
  children: Task[]

  @TreeParent()
  parent: Task;
}