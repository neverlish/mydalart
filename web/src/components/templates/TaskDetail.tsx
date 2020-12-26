import { Card } from 'antd';
import { GetTaskDetail_task as Task } from '../../types/generated/GetTaskDetail';
import TaskCardList from '../organisms/TaskCardList';

interface TaskDetailProps {
  task: Task
}

export default function TaskDetail({ task }: TaskDetailProps) {
  return (
    <Card
      type='inner'
      title={task.text}
      extra={task.user.email}
    >
      <TaskCardList task={task} rootTask={task} colSpan={8} />
    </Card>
  )
}