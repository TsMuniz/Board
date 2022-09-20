import React from 'react'
import styles from './style.module.scss'
import Head from 'next/head'
import { FiCalendar, FiClock, FiEdit2, FiPlus, FiTrash } from 'react-icons/fi'
import { SupportButton } from '../../components/SupportButton'

export default function Board() {
  return (
    <>
    <Head>
      <title>Minhas tarefas - Board</title>
    </Head>
      <main className={styles.container}>
        <form>
          <input
            type="text"
            placeholder='Digite sua tarefa...' 
          />
          <button          
          type='submit'
          >
            <FiPlus
              size={25}
              color = "#17181f"
            />
          </button>
        </form>

        <section>
          <article className={styles.taskList}>
            <p>Aprender criar projestos usando next js e aplicando firebase como back.</p>
            <div className={styles.actions}>
              <div>
                <div>
                  <FiCalendar size={25} color="#ffb800"/>
                  <time>17 Julho 2021</time>
                </div>
                <button>
                  <FiEdit2 size={20} color="#fff"/>
                  <span>Editar</span>
                </button>
              </div>
              <button>
                <FiTrash size={20} color="#ff3636"/>
                <span>Excluir</span>
              </button>
            </div>
          </article>
        </section>

      </main>

      <div className={styles.vipContainer}>
        <h3>Obrigado por apoiar este projeto.</h3>
        <div>
          <FiClock size={28} color="#fff"/>
          <time>
            Última doação foi a 3 dias
          </time>
        </div>
      </div>

      <SupportButton/>
    </>
  )
}
