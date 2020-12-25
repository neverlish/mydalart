import { Row } from 'antd';
import { GetTaskDetail_task as Task } from '../../types/generated/GetTaskDetail';
import TaskCardItem, { TaskChild } from '../molecules/TaskCardItem';

interface TaskCardListProps {
  task; // TODO: 타입 수정해야 함
  rootTask;
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

export default function TaskCardList({ task, rootTask }: TaskCardListProps) {
  if (!task.children || task.children.length === 0) {
    return <></>; // TODO: 이거 수정해야 함
  }

  const taskList = makeTaskList(task)

  if (!task.children[0].children) {
    return <TaskCardItem
      taskList={taskList}
      rootTaskId={rootTask.id}
      taskId={task.id} />
  }
  return <Row>
    {taskList.map((t, i) =>
      <TaskCardList
        task={t}
        key={`${t.id}-${i}`}
        rootTask={rootTask}
      />
    )}
  </Row>
}