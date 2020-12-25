import { UserOutlined } from '@ant-design/icons';
import { gql, useMutation } from '@apollo/client';
import { Alert, Input, Layout, Modal } from 'antd';
import 'antd/dist/antd.css';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { SignIn } from '../../types/generated/SignIn';

export const LOCAL_STORAGE_LOGIN_TOKEN_KEY = 'LOGIN_TOKEN';

const LOGIN_MUTATION = gql`
  mutation SignIn($email: String!) {
    signIn(email: $email) {
      token
    }
  }
`

export default function Header() {
  const [signIn] = useMutation<SignIn>(LOGIN_MUTATION)
  const [loggedIn, setLoggedIn] = useState(false)
  const [loginModalOpen, setLoginModalOpen] = useState(false)
  const [loginEmail, setLoginEmail] = useState('')
  const [alertMessage, setAlertMessage] = useState('')

  useEffect(() => {
    const token = localStorage.getItem(LOCAL_STORAGE_LOGIN_TOKEN_KEY)
    if (token) {
      setLoggedIn(true)
    }
  }, [])

  function renderUserIcon() {
    if (loggedIn) {
      return <Link href='/my'>
        <UserOutlined style={{ float: 'right', marginTop: 22 }} />
      </Link>
    } else {
      return <UserOutlined
        style={{ float: 'right', marginTop: 22 }}
        onClick={() => setLoginModalOpen(true)}
      />
    }
  }

  async function login() {
    try {
      const { data } = await signIn({ variables: { email: loginEmail } })
      localStorage.setItem(LOCAL_STORAGE_LOGIN_TOKEN_KEY, data.signIn.token)
      setLoggedIn(true)
      setLoginModalOpen(false)
    } catch (e) {
      setAlertMessage(e.message)
    }
  }

  return (
    <>
      <Layout.Header style={{ color: 'white', fontSize: '16px' }}>
        <Link href='/'>
          <a style={{ color: 'white' }}>
            <strong>Mydalart</strong> - make my mandalart
        </a>
        </Link>
        {renderUserIcon()}
      </Layout.Header>

      <Modal
        title='Login'
        visible={loginModalOpen}
        onOk={login}
        onCancel={() => setLoginModalOpen(false)}
      >
        <Input
          type='email'
          placeholder='Input email'
          onChange={(e) => setLoginEmail(e.target.value)}
        />

        {alertMessage &&
          <Alert message={alertMessage} type='error' closable />}
      </Modal>
    </>
  )
}