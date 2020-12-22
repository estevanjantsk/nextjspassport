import axios from "axios"
import Head from 'next/head'
import styles from '../../styles/Home.module.css'

const SignIn = () => {

  const login = () => {
    axios.post('/api/auth/login', {
      username: "teste",
      password: "12345"
    })
      .then(() => {
        console.log('opa');
      }).catch(() => {
        console.log('error');
      });
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>SignIn</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          SignIn
        </h1>

        <p className={styles.description}>
          <code className={styles.code}>passport-local</code>
        </p>

        <div className={styles.grid}>
          <div onClick={login} className={styles.card}>
            <p>Just click to try to login</p>
          </div>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  )
}

export default SignIn;