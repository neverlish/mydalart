import { gql, useQuery } from "@apollo/client"
import Head from 'next/head'
import { PublicTaskList } from '../types/generated/PublicTaskList'

const PUBLIST_TASK_LIST_QUERY = gql`
  query PublicTaskList {
    publicTaskList {
      items {
        id
        text
        user {
          email
        }
      }
    }
  }
`

export default function Home() {
  const { loading, error, data } = useQuery<PublicTaskList>(PUBLIST_TASK_LIST_QUERY)
  return (
    <div>
      <Head>
        <title>Mydalart</title>
      </Head>
    </div>
  )
}
