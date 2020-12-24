import { Row } from 'antd';
import { TaskListItems_items as Task } from '../../types/generated/TaskListItems';
import TaskListItem from '../organisms/TaskListItem';

interface TaskListProps {
  items: Task[]
}

export default function TaskList({ items }: TaskListProps) {
  return (
    <Row gutter={24}>
      {items.map((task) =>
        <TaskListItem task={task} key={task.id} />
      )}
    </Row>
  )
}