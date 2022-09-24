import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'
import React from 'react'
import { doc, getDoc } from "firebase/firestore";
import { db } from '../../services/firebase'
import styles from './detailsPage.module.scss'
import { format } from 'date-fns'
import Head from 'next/head';
import { FiCalendar } from 'react-icons/fi';

export default function task({docSnap}) {
	const task = JSON.parse(docSnap)
	console.log(task)
  return (
    <>
      <Head>
        <title>Detalhes da tarefa</title>
      </Head>
      <article className={styles.container}>
        <div className={styles.actions}>
          <div>
            <FiCalendar size={30} color="#fff"/>
            <span>Tarefa Criada</span>
            <time>{task.createdFormated}</time>
          </div>
        </div>
        <p>{task.task}</p>
      </article>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context)
	const {params: {id}} = context

  if(!session) return {
    redirect: {
      destination: '/board',
      permanent: false
    }
  }

	const docRef = doc(db, "tasks", id.toString());
	const docSnap = await getDoc(docRef);

  const farmatedData = {
    ...docSnap.data(),
    createdFormated: format(docSnap.data().createdAt.toDate(), 'dd MMMM yyyy'),
  }

    return{
        props: {
					docSnap: JSON.stringify(farmatedData)
        }
    }
}
