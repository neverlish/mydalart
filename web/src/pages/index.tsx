import { LoadingOutlined } from '@ant-design/icons';
import { gql, useQuery } from "@apollo/client";
import { PublicTaskList } from '../types/generated/PublicTaskList';

const PUBLIST_TASK_LIST_QUERY = gql`
  fragment TaskListItems on TaskList {
    items {
      id
      text
      user {
        email
      }
      children {
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
  const { loading, error, data } = useQuery<PublicTaskList>(PUBLIST_TASK_LIST_QUERY)

  function render() {
    if (loading) {
      return <LoadingOutlined spin />
    }
  }
  return (
    <div>
      {render()}
    </div>
  )
}
