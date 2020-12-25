import { LoadingOutlined } from '@ant-design/icons';
import { gql, useQuery } from "@apollo/client";
import TaskList from "../components/templates/TaskList";
import { PublicTaskList } from '../types/generated/PublicTaskList';

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
    return <TaskList items={data.publicTaskList.items} />
  }
  return (
    <div>
      {render()}
    </div>
  )
}
