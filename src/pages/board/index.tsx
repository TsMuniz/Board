import React, {FormEvent, useState} from 'react'
import styles from './style.module.scss'
import Head from 'next/head'
import { FiCalendar, FiClock, FiEdit2, FiPlus, FiTrash,FiX } from 'react-icons/fi'
import { SupportButton } from '../../components/SupportButton'
import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'
import { collection, addDoc, where, query, getDocs, orderBy, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from '../../services/firebase'
import { format } from 'date-fns'
import Link from 'next/link'

type task = {
  id: string,
  createdAt: string | Date,
  createdFormated: string,
  task: string,
  userEmail: string,
  name: string
}

export default function Board({user, tasks}) {
  const parsedTasks = JSON.parse(tasks)
  
  const [task, setTask] = useState('')
  const [taskList, setTaskList] = useState<task[]>(parsedTasks)
  const [taskEdited, setTasEdited] = useState<task | null >(null)

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

      if(taskEdited) {
        const taskRef = doc(db, "tasks", taskEdited.id);
        await updateDoc(taskRef, {
          task: taskEdited.task
        });
        const data = taskList
        const taskIndex = taskList.findIndex((task) => task.id === taskEdited.id)
        data[taskIndex].task = task
        setTaskList(data)
        setTasEdited(null)
        setTask('')
        return taskRef
      }
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

  const deleteTask = (id: string) => {
    deleteDoc(doc(db, "tasks", id))

    const restTasks = taskList.filter((task) => task.id !== id )

    setTaskList(restTasks)
    
  }

  const updateTask = (task: task) => {
    setTask(task.task)
    setTasEdited(task)
  }

  const cancelUpdatedTask = () => {
    setTask('')
    setTasEdited(null)
  }

  return (
    <>
    <Head>
      <title>Minhas tarefas - Board</title>
    </Head>
      <main className={styles.container}>
        {
          taskEdited && (
            <span className={styles.warnText}>
              <button
                onClick={ cancelUpdatedTask }
              >
                <FiX size={30} color="#ff3636"/>
              </button>
              Voce esta editando uma tarefa!
            </span>
          )
        }
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
                      <span
                        onClick={() => updateTask(task)}
                      >Editar</span>
                    </button>
                  </div>
                  <button>
                    <FiTrash size={20} color="#ff3636"/>
                    <span
                      onClick={() => deleteTask(task.id)}
                    >Excluir</span>
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
  if(!session) return {
    redirect: {
      destination: '/',
      permanent: false
    }
  }
  const {user} = session

  const q = query(collection(db, "tasks"), where("userEmail", "==", user.email), orderBy("createdAt"));
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

  return{
    props: {user, tasks: JSON.stringify(tasks)}
  }
}