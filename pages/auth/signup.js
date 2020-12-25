import { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useStoreActions } from "easy-peasy";
import axios from "axios";
import styles from '../../styles/Home.module.css';

const SignUp = () => {
  const router = useRouter();
  const [userForm, setUserForm] = useState({
    username: '',
    email: '',
    password: '',
    passwordconfirmation: ''
  });
  const [errorMessages, setErrorMessages] = useState([]);
  const setUser = useStoreActions((actions) => actions.setUser);


  const signUp = (e) => {
    e.preventDefault();
    axios.post('/api/auth/signup', userForm)
      .then(res => res.data)
      .then(({ user }) => {
        setUser(user);
        router.push('/');
      })
      .catch(err => {
        if (err.response) {
          const errors = Object.values(err.response.data.error).flatMap((value) => value)
          setErrorMessages(errors);
        }
      })
  }

  const onChange = (name, value) => {
    setUserForm((data) => ({ ...data, [name]: value }))
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>SignUp</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          SignUp
        </h1>

        <div>
          {errorMessages.map((message, i) => (
            <div key={i}>
              {message}
            </div>
          ))}
          <form onSubmit={signUp}>
            <div>
              <label htmlFor="username">
                Username
                <input type="text" name="username" id="username" value={userForm.username} onChange={e => onChange('username', e.target.value)} />
              </label>
            </div>
            <div>
              <label htmlFor="email">
                Email
                <input type="email" name="email" id="email" value={userForm.email} onChange={e => onChange('email', e.target.value)} />
              </label>
            </div>
            <div>
              <label htmlFor="password">
                Password
                <input type="text" name="password" id="password" value={userForm.password} onChange={e => onChange('password', e.target.value)} />
              </label>
            </div>
            <div>
              <label htmlFor="passwordconfirmation">
                Password confirmation
                <input type="text" name="passwordconfirmation" id="passwordconfirmation" value={userForm.passwordconfirmation} onChange={e => onChange('passwordconfirmation', e.target.value)} />
              </label>
            </div>
            <button type="submit">signup</button>
          </form>
        </div>
      </main>
    </div>
  )
}

export default SignUp;