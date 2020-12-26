import { Card, Col } from 'antd'
import Link from 'next/link'
import { TaskListItems_items as Task } from '../../types/generated/TaskListItems'
import TaskCardList from './TaskCardList'

interface TaskListItemProps {
  task: Task
}

export default function TaskRoot({ task }: TaskListItemProps) {
  return (
    <Col span={8} style={{ marginTop: 24, textAlign: 'center' }}>
      <Card
        type='inner'
        title={`${task.text} by ${task.user.email}`}
        extra={<Link href={`/tasks/${task.id}`}>Go</Link>}
      >
        <TaskCardList task={task} rootTask={task} colSpan={24} />
      </Card>
    </Col>
  )
}