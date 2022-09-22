import React, {FormEvent, useState} from 'react'
import styles from './style.module.scss'
import Head from 'next/head'
import { FiCalendar, FiClock, FiEdit2, FiPlus, FiTrash } from 'react-icons/fi'
import { SupportButton } from '../../components/SupportButton'
import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'
import { collection, addDoc, where, query, getDocs } from "firebase/firestore";
import { db } from '../../services/firebase'
import { format } from 'date-fns'
import Link from 'next/link'


export default function Board({user, tasks}) {
  const parsedTasks = JSON.parse(tasks)
  
  const [task, setTask] = useState('')
  const [taskList, setTaskList] = useState(parsedTasks)

  const saveTask = async (e: FormEvent) => {
    e.preventDefault()
    try {
      if(task.length !== 0) {
        const docRef = await addDoc(collection(db, "tasks"), {
          userEmail: user.email,
          task,
          createdAt: new Date(),
          name: user.name
        });
        const data = {
          id: docRef.id,
          createdAt: new Date(),
          createdFormated: format(new Date(), 'dd MMMM yyyy'),
          task,
          userEmail: user.email,
          name: user.name
        }
        setTaskList([...taskList, data])
        setTask('')
      }
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  return (
    <>
    <Head>
      <title>Minhas tarefas - Board</title>
    </Head>
      <main className={styles.container}>
        <form onSubmit={(e) => saveTask(e)}>
          <input
            type="text"
            placeholder='Digite sua tarefa...'
            value={task}
            onChange={(e) => setTask(e.target.value)} 
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
          {taskList.map((task,index) => {
            return(
              <article 
              key={`${index}${task}`}
              className={styles.taskList}
              >
                <Link href={`board/${task.id}`}>
                  <p>{task.task}</p>
                </Link>
                <div className={styles.actions}>
                  <div>
                    <div>
                      <FiCalendar size={25} color="#ffb800"/>
                      <time>{task.createdFormated}</time>
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
            )
          })}
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

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context)
  const {user} = session

  const q = query(collection(db, "tasks"), where("userEmail", "==", user.email));
  const querySnapshot = await getDocs(q);
  let tasks = []
  querySnapshot.forEach((doc) => {
    tasks.push(
      {
        id: doc.id,
        createdFormated: format(doc.data().createdAt.toDate(), 'dd MMMM yyyy'),
        ...doc.data()
      })
  });

  if(!session) return {
    redirect: {
      destination: '/',
      permanent: false
    }
  }
  return{
    props: {user, tasks: JSON.stringify(tasks)}
  }
}