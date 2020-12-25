import { LoadingOutlined } from '@ant-design/icons'
import { gql, useQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import TaskDetail from '../../components/templates/TaskDetail'
import { GetTaskDetail } from '../../types/generated/GetTaskDetail'

const TASK_DETAIL_QUERY = gql`
  query GetTaskDetail($id: ID!) {
    task(id: $id) {
      id
      text
      isMine
      user {
        email
      }
      parent {
        id
        text
        parent {
          id
          text
        }
      }
      children {
        id
        text
        children {
          id
          text
        }
      }
    }
  }
`

export default function TaskDetailPage() {
  const router = useRouter()
  const { id = -1 } = router.query

  const { loading, error, data } = useQuery<GetTaskDetail>(TASK_DETAIL_QUERY, { variables: { id } })

  if (loading) {
    return <LoadingOutlined spin />
  }
  if (error) {
    return error.message
  }

  return (
    <TaskDetail task={data.task} />
  )
}