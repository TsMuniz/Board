/* eslint-disable @next/next/no-img-element */
import  Head  from 'next/head'
import styles from '../styles/home.module.scss'
import { GetStaticProps } from 'next'

export default function Home() {
  return (
   <>
    <Head>
      <title>
        Bem vindo
      </title>
    </Head>
    <main className={styles.contentContainer}>
      <img src="/images/board-user.svg" alt="ferramenta board" />
      <section className={styles.callToAction}>
        <h1>Uma ferramenta para seu dia a dia Escreva, planeje e organize-se..</h1>
        <p>
          <span>100% gratuito </span>
          e online
        </p>
      </section>
      
    <div className={styles.donaters}>
      <img src="https://sujeitoprogramador.com/steve.png" alt="imagem do usuario" />
    </div>

    </main>
   </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {

    },
    revalidate: 60 * 60
  }
}
