import { UserOutlined } from '@ant-design/icons';
import { ApolloProvider } from "@apollo/client";
import { Layout } from 'antd';
import 'antd/dist/antd.css';
import Head from 'next/head';
import { useApollo } from "../lib/apolloClient";

export default function App({ Component, pageProps }) {
  const apolloClient = useApollo(pageProps.initialApolloState)

  return (
    <ApolloProvider client={apolloClient}>
      <Layout>
        <Head>
          <title>Mydalart</title>
        </Head>
        <Layout.Header style={{ textAlign: 'right' }}>
          <UserOutlined style={{ color: '#fff', fontSize: '20px' }} />
        </Layout.Header>
        <Layout.Content style={{ padding: '48px' }}>
          <Layout.Content style={{ padding: '24px', backgroundColor: '#fff' }}>
            <Component {...pageProps} />
          </Layout.Content>
        </Layout.Content>
      </Layout>
    </ApolloProvider>
  )
}