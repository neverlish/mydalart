import { LoadingOutlined } from '@ant-design/icons'
import { gql, useQuery } from "@apollo/client"
import { Typography } from 'antd'
import TaskRootList from "../components/templates/TaskRootList"
import { PublicTaskList } from '../types/generated/PublicTaskList'

const PUBLIST_TASK_LIST_QUERY = gql`
  fragment TaskListItems on TaskList {
    items {
      id
      text
      isMine
      user {
        email
      }
      children {
        id
        text
      }
    }
  }

  query PublicTaskList {
    publicTaskList {
      ...TaskListItems
    }
  }
`

export default function Home() {
  const { loading, data } = useQuery<PublicTaskList>(PUBLIST_TASK_LIST_QUERY)

  function render() {
    if (loading) {
      return <LoadingOutlined spin />
    }
    return <TaskRootList items={data.publicTaskList.items} />
  }
  return (
    <div>
      <Typography.Title level={2}>All tasks</Typography.Title>
      {render()}
    </div>
  )
}
