import { Card, Col } from 'antd'
import Link from 'next/link'
import { TaskListItems_items as Task } from '../../types/generated/TaskListItems'

interface TaskListItemProps {
  task: Task
}

export default function TaskListItem({ task }: TaskListItemProps) {
  return (
    <Col span={8} style={{ marginTop: 24, textAlign: 'center' }}>
      <Card
        type='inner'
        title={`${task.text} by ${task.user.email}`}
        extra={<Link href={`/tasks/${task.id}`}>Go</Link>}
      >
        {task.children.map((t) =>
          <Card.Grid key={t.id}>{t.text}</Card.Grid>
        )}
      </Card>
    </Col>
  )
}