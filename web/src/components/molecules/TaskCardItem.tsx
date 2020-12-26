import { Card, Col, Input } from 'antd'
import { GetTaskDetail_task_children_children as TaskChildBase } from '../../types/generated/GetTaskDetail'

export interface TaskChild extends TaskChildBase {
  children?: TaskChildBase[],
}

interface TaskCardItemProp {
  rootTaskId: string
  taskId: string
  taskList: TaskChild[]
  colSpan: number
  updateTask?: (id: string, text: string) => void
}

function getBackgroundColor(isRenderTask: boolean, rootTaskId: string, taskId: string) {
  if (rootTaskId === taskId) {
    if (isRenderTask) {
      return '#479c40'
    }
    return '#c4d713'
  }
  if (isRenderTask) {
    return '#c4d713'
  }
  return '#fff'
}

export default function TaskCardItem({ taskList, rootTaskId, taskId, updateTask, colSpan }: TaskCardItemProp) {

  function renderTaskText(task: TaskChild) {
    if (updateTask) {
      return <Input
        style={{ borderBottom: '1.5px solid #bbb' }}
        bordered={false}
        value={task.text}
        onChange={(e) => updateTask(task.id, e.target.value)}
      />
    }
    return task.text
  }

  return <Col span={colSpan}>
    {
      taskList.map((task, i) => {
        const isRootTask = task.id === taskId

        return <Card.Grid
          style={{
            backgroundColor: getBackgroundColor(isRootTask, rootTaskId, taskId),
            textAlign: 'center',
            fontWeight: isRootTask ? 'bold' : 'normal',
            height: '130px',
          }}
          key={`${task.id}-${i}`}>
          {renderTaskText(task)}
        </Card.Grid>
      })
    }
  </Col>
}