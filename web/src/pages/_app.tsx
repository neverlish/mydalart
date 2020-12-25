import { ApolloProvider } from "@apollo/client"
import { Layout } from 'antd'
import 'antd/dist/antd.css'
import Head from 'next/head'
import Header from '../components/templates/Header'
import { useApollo } from "../lib/apolloClient"

export default function App({ Component, pageProps }) {
  const apolloClient = useApollo(pageProps.initialApolloState)

  return (
    <ApolloProvider client={apolloClient}>
      <Layout style={{ minHeight: '100vh' }}>
        <Head>
          <title>Mydalart</title>
        </Head>
        <Header />
        <Layout.Content style={{ padding: '48px', textAlign: 'center', height: '100%' }}>
          <Layout.Content style={{ padding: '24px', backgroundColor: '#fff' }}>
            <Component {...pageProps} />
          </Layout.Content>
        </Layout.Content>
        <Layout.Footer>
          mydalart by neverlish
        </Layout.Footer>
      </Layout>
    </ApolloProvider>
  )
}