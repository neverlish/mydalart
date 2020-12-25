import { Card, Col } from 'antd';
import { GetTaskDetail_task_children_children as TaskChildBase } from '../../types/generated/GetTaskDetail';

export interface TaskChild extends TaskChildBase {
  children?: TaskChildBase[],
}

interface TaskCardItemProp {
  rootTaskId: string;
  taskId: string;
  taskList: TaskChild[];
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

export default function TaskCardItem({ taskList, rootTaskId, taskId }: TaskCardItemProp) {
  return <Col>
    {
      taskList.map((renderTask, i) => {
        const isRenderTask = renderTask.id === taskId

        return <Card.Grid
          style={{
            backgroundColor: getBackgroundColor(isRenderTask, rootTaskId, taskId),
            textAlign: 'center',
            fontWeight: isRenderTask ? 'bold' : 'normal',
            height: '130px',
          }}
          key={`${renderTask.id}-${i}`}>
          {renderTask.text}
        </Card.Grid>
      })
    }
  </Col>
}