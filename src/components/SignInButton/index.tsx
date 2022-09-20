/* eslint-disable @next/next/no-img-element */
import React from 'react'
import styles from './styles.module.scss'
import {FaGithub} from 'react-icons/fa'
import {FiX} from 'react-icons/fi'

export default function SignInButton() {

    const session = false
  return (
    session ? (
        <button 
            className={styles.signInButton}
            type="button"
        >   
            <img src="https://sujeitoprogramador.com/steve.png" alt="imagem do usuario logado" />
            Olá steve
            <FiX
                className={styles.closeIcon}
                color="#737380"
            />
        </button>
    ) : (
        <button 
            className={styles.signInButton}
            type="button"
        >   
            <FaGithub
                color="#ffb800"
            />
            Entrar com Github
        </button>
    )
  )
}
