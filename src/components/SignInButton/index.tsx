/* eslint-disable @next/next/no-img-element */
import {signIn, signOut, useSession} from 'next-auth/react'
import React from 'react'
import styles from './styles.module.scss'
import {FaGithub} from 'react-icons/fa'
import {FiX} from 'react-icons/fi'


export default function SignInButton() {

    const session = useSession()
    console.log(session)
   
  return (
    session.status === "authenticated" ? (
        <button 
            className={styles.signInButton}
            type="button"
            onClick={() => signOut()}
        >   
            <img src={session.data.user.image} alt="imagem do usuario logado" />
            Olá {session.data.user.name}
            <FiX
                className={styles.closeIcon}
                color="#737380"
            />
        </button>
    ) : (
        <button 
            className={styles.signInButton}
            type="button"
            onClick={() => signIn('github')}
        >   
            <FaGithub
                color="#ffb800"
            />
            Entrar com Github
        </button>
    )
  )
}
