import Head from 'next/head'
import Link from 'next/link'
import { useStoreState, useStoreActions } from "easy-peasy";
import axios from "axios";
import styles from '../styles/Home.module.css'

export default function Home() {
  const user = useStoreState((state) => state.user);
  const setUser = useStoreActions((actions) => actions.setUser);

  const logout = () => {
    axios.post('/api/auth/logout', {})
      .then(() => {
        setUser(null);
      })
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>

        <p className={styles.description}>
          Get started by editing{' '}
          <code className={styles.code}>pages/index.js</code>
        </p>

        <div className={styles.grid}>
          {user ? (
            <div>
              user logged in: {user.name}
              <button onClick={logout} type="submit">Logout</button>
            </div>
          ) : (
              <>
                <Link href="/auth/signin">
                  <a className="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1" type="button" style={{ transition: "all .15s ease" }}>
                    Sign in
                  </a>
                </Link>
                <Link href="/auth/signup">
                  <a className={styles.card}> Signup </a>
                </Link>
              </>
            )}
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

