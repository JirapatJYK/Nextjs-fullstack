import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Router from 'next/router'
import { useEffect, useState, useCallback } from 'react'
import Loader from '../components/Loader'
import Navbar from '../components/Navbar'
import SelectDropdown from '../components/SelectDropdown'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  const [list, setList] = useState(
    [
      {
        id: 0,
        value: 'Hello World0'
      },
      {
        id: 1,
        value: 'Hello World1'
      }
    ]
  )
  const [isLoading, setIsloading] = useState(true);
  const [count, setCount] = useState(0);
  useEffect(()=> {
    console.log('Home Component')
    const timeout = setTimeout(()=> {
      setIsloading(false);
    },1000)
  })
  return (
    <div >
      <Head>
        <title>Web App Name</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Loader isLoading = {isLoading} />
      <Navbar />
      <main className='container'>
        <section className='' style={{backgroundImage: "url('/ASUS.jpg')" , backgroundRepeat: 'no-repeat', backgroundSize: 'cover'}}>
          <div className="main">
            <div className='row' >
              <div className='col-5 ' style={{height: '300px',display: 'flex', flexDirection: 'column',justifyContent: 'center'}}>
                <div className='title'>
                  <h1 className=''>LOGO NAME</h1>
                </div>
                <div className={styles.grid}>
                  <a href="https://nextjs.org/docs" className={styles.card}>
                    <h2>Documentation &rarr;</h2>
                    <p>Find in-depth information about Next.js features and API.</p>
                  </a>

                  <a href="https://nextjs.org/learn" className={styles.card}>
                    <h2>Learn &rarr;</h2>
                    <p>Learn about Next.js in an interactive course with quizzes!</p>
                  </a>
                  {/* <div className='video'> */}
                  {/* <iframe width={853} height={480} src="https://www.youtube.com/embed/OBqw818mQ1E" title="SiM – The Rumbling (OFFICIAL VIDEO)"  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe> */}
                  {/* <iframe width="853" height="480" src="https://www.youtube.com/embed/veBu03A6ptw" title="1. How to develop an NFT Smart Contract (ERC721) with Alchemy - Beginner | Road to Web3" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" ></iframe> */}
                  {/* </div> */}
                  
                </div>
              </div>
              <div className='col-5' style={{backgroundColor: "deepskyblue"}}>
                <Image src='/vercel.svg' width='300' height='300'/>
              </div>
            </div>
            
            <p className={styles.description}>
              Get started by editing{' '}
              <code className={styles.code}>pages/index.tsx</code>
            </p>
          </div>
        </section>
        <section >
          <video controls src='/video0.mp4'/>
        </section>
        <section className='' style={{backgroundColor: ""}}>
          <div className="timeline">
            <ul>
              <li>
                <div className='timeline-content'>
                  <h2>2022</h2>
                  <p>
                    Story 
                  </p>
                </div>
              </li>
              <li>
                <div className='timeline-content'>
                  <h2>2023</h2>
                  <p>
                    Learn about Next.js in an interactive course with quizzes! 
                  </p>
                </div>
              </li>
              <li>
                <div className='timeline-content'>
                  <h2>2024</h2>
                  <p>
                    Learn about Next.js in an interactive course with quizzes! 
                  </p>
                </div>
              </li>
              <li>
                <div className='timeline-content'>
                  <h2>2025</h2>
                  <p>
                    Learn about Next.js in an interactive course with quizzes! 
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </section>
        <section>
          <div className='main'>
            <SelectDropdown header={"Select 0"} list={list}/>
          </div>
        </section>
      </main>
     

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}

export default Home
