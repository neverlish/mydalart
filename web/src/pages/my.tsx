import { LoadingOutlined } from "@ant-design/icons"
import { gql, useQuery } from "@apollo/client"
import { Typography } from "antd"
import TaskRootList from "../components/templates/TaskRootList"
import { MyTaskList } from "../types/generated/MyTaskList"

const MY_PAGE_QUERY = gql`
  query MyTaskList {
    myTaskList {
      items {
        id
        text
        isMine
        user {
          email
        }
        children {
          text
          id
        }
      }
    }
  }
`

export default function MyPage() {
  const { loading, data } = useQuery<MyTaskList>(MY_PAGE_QUERY)

  function render() {
    if (loading) {
      return <LoadingOutlined spin />
    }
    return <TaskRootList items={data.myTaskList.items} />
  }

  return (
    <div>
      <Typography.Title level={2}> My page</Typography.Title>
      {render()}
    </div>
  )
}