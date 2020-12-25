import { Row } from 'antd';
import { TaskListItems_items as Task } from '../../types/generated/TaskListItems';
import TaskRoot from '../organisms/TaskRoot';

interface TaskRootListProps {
  items: Task[]
}

export default function TaskRootList({ items }: TaskRootListProps) {
  return (
    <Row gutter={24}>
      {items.map((task) =>
        <TaskRoot task={task} key={task.id} />
      )}
    </Row>
  )
}