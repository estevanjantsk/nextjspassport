import axios from "axios"
import Head from 'next/head'
import styles from '../../styles/Home.module.css'

const SignIn = () => {

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

        <div>
          <form action="/api/auth/signin" method="post">
            <input type="text" name="username" id="username" defaultValue="teste" />
            <input type="text" name="password" id="password" defaultValue="12345" />
            <button type="submit">login</button>
          </form>
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