import { Row } from 'antd';
import TaskCardItem, { TaskChild } from '../molecules/TaskCardItem';

export interface TaskCardListPropsTask extends TaskChild {
  children?: Array<TaskChild & { children?: TaskChild[] }>
}

export interface TaskCardListProps {
  task: TaskCardListPropsTask
  rootTask: TaskChild
  colSpan: number
  updateTask?: (id: string, text: string) => void;
}

function makeTaskList(task: TaskChild): TaskChild[] {
  const halfLength = Math.floor(task.children.length / 2)

  return [
    ...(task.children && task.children.slice(0, halfLength)),
    {
      id: task.id,
      text: task.text,
      ...((task.children.length && task.children.length > 0) && {
        children: task.children.map(
          (t) => ({ id: t.id, text: t.text })
        )
      }),
    },
    ...(task.children && task.children.slice(halfLength)),
  ]
}

export default function TaskCardList({ task, rootTask, updateTask, colSpan }: TaskCardListProps) {
  if (!task.children || task.children.length === 0) {
    return <></>; // TODO: 이거 수정해야 함
  }

  const taskList = makeTaskList(task)

  if (!task.children[0].children) {
    return <TaskCardItem
      colSpan={colSpan}
      taskList={taskList}
      rootTaskId={rootTask.id}
      taskId={task.id}
      updateTask={updateTask}
    />
  }
  return <Row>
    {taskList.map((t, i) =>
      <TaskCardList
        colSpan={colSpan}
        task={t}
        key={`${t.id}-${i}`}
        rootTask={rootTask}
        updateTask={updateTask}
      />
    )}
  </Row>
}