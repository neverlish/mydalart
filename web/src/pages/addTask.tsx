import { gql, useMutation } from '@apollo/client';
import { Button, Typography } from 'antd';
import Checkbox from 'antd/lib/checkbox/Checkbox';
import { useState } from 'react';
import TaskCardList, { TaskCardListPropsTask } from '../components/organisms/TaskCardList';
import { useRouter } from 'next/router'
import { CreateTask, CreateTaskVariables } from '../types/generated/CreateTask';
import { CreateTaskInput } from '../types/generated/globalTypes';
import { PlusOutlined } from '@ant-design/icons';

const CREATE_TASK_MUTATION = gql`
  mutation CreateTask($input: CreateTaskInput!) {
    createTask(input: $input) {
      id
    }
  }
`

function makeNumberArray(n: number) {
  return Array(n).fill(undefined).map((i, j) => j + 1)
}

const baseTask: TaskCardListPropsTask = {
  id: '0',
  text: '',
  children: makeNumberArray(8).map((i) => ({
    id: `${i}`, text: '',
    children: makeNumberArray(8).map((j) => ({ id: `${i}-${j}`, text: '' }))
  }))
}

export default function AddTaskPage() {
  const [taskToCreate, setTaskToCreate] = useState(baseTask)
  const [isPublic, setIsPublic] = useState(true)
  const [createTask] = useMutation<CreateTask, CreateTaskVariables>(CREATE_TASK_MUTATION)
  const router = useRouter()

  function updateTask(id: string, text: string) {
    const copiedTask: TaskCardListPropsTask = {
      ...taskToCreate,
      children: taskToCreate.children.map((i) =>
        ({ ...i, children: i.children.map((j) => ({ ...j })) })
      )
    }

    function setTextIfMatches(task: { id: string, text: string }) {
      if (task.id === id) {
        task.text = text
      }
    }

    setTextIfMatches(copiedTask)

    copiedTask.children.forEach((child) => {
      setTextIfMatches(child)
      child.children.forEach((childChild) => {
        setTextIfMatches(childChild)
      })
    })

    setTaskToCreate(copiedTask)
  }

  async function addTask() {
    const input: CreateTaskInput = {
      isPublic,
      text: taskToCreate.text,
      children: taskToCreate.children.map((i) => ({ text: i.text, children: i.children.map(({ text }) => ({ text })) }))
    }
    const { data: { createTask: { id } } } = await createTask({ variables: { input } })
    router.push(`/tasks/${id}`)
  }

  return (
    <div>
      <Button style={{ float: 'right' }} onClick={addTask}>
        <PlusOutlined />
      </Button>
      <Checkbox
        checked={isPublic}
        onChange={(e) => setIsPublic(e.target.checked)}
        style={{ float: 'right', marginTop: '5px' }}
      >
        Public
      </Checkbox>
      <Typography.Title level={2} style={{ display: 'flex' }}>Add my mandal-art</Typography.Title>
      <TaskCardList
        colSpan={8}
        rootTask={baseTask}
        task={taskToCreate}
        updateTask={updateTask}
      />
    </div>
  )
}