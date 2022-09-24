/* eslint-disable @next/next/no-img-element */
import styles from './styles.module.scss'

import React from 'react'
import Head from 'next/head'
import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'

// AbdwQTxkr8gLalKRQGIh_DozmKgNyrSxlVyVXfBBZWz0Eoob5NLPI0gAZ0Iv-XCtgxAX-mdFC4InlzzZ
// <script src="https://www.paypal.com/sdk/js?client-id=YOUR_CLIENT_ID"></script>
export default function Donate(user) {
console.log(user.user.image)

  return (
    <>
        <Head>
            <title>Nos ajude a ficar online!</title>
        </Head>
        <main className={styles.container}>
            <img src="/images/rocket.svg" alt="imagem de um foguete" />
            <div className={styles.donater}>
              <img src={user.user.image} alt="Imagem do apoiador" />
              <span>Parabéns, você é um apoiador!</span>
            </div>
            <h1>Seja um apoiador deste projeto 🏆</h1>
            <h3>Contribua com apenas<span>R$ 1,00</span></h3>
            <strong>Apareça na nosso home e tenha funcionalidades exclusivas.</strong>
        </main>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = getSession(context)

  if(!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }    
  }

  const {user} = await session
  return {
    props: {
      user
    }
  }
} 
