import { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useStoreActions } from "easy-peasy";
import axios from "axios";
import styles from '../../styles/Home.module.css';

const SignIn = () => {
  const router = useRouter();
  const setUser = useStoreActions((actions) => actions.setUser);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessages, setErrorMessages] = useState([]);

  const signIn = (e) => {
    e.preventDefault();
    axios.post('/api/auth/signin', { username, password })
      .then(res => res.data)
      .then(({ user }) => {
        setUser(user);
        router.push('/');
      })
      .catch(err => {
        if (err.response) {
          setErrorMessages([err.response.data.error])
        }
      })
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

        {errorMessages.map((message, i) => (
          <div key={i}>
            {message}
          </div>
        ))}
        <div>
          <form onSubmit={signIn}>
            <input type="text" name="username" id="username" value={username} onChange={e => setUsername(e.target.value)} />
            <input type="text" name="password" id="password" value={password} onChange={e => setPassword(e.target.value)} />
            <button type="submit">login</button>
          </form>
        </div>
        <hr />
        <div>
          <a href="/api/auth/google">SINGIN WITH GOOGLE</a>
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