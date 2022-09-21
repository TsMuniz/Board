import { Header } from '../components/Header'
import '../styles/global.css'
import { SessionProvider } from 'next-auth/react'


function MyApp({ Component, pageProps: {session, ...pageProps} }) {
  return (
    <SessionProvider session={session}>
      <Header/>
      <Component {...pageProps} />
    </SessionProvider>
  )
}

export default MyApp
