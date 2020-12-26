import { useEffect } from "react";
import NextApp from 'next/app';
import { StoreProvider } from "easy-peasy";
import { store } from '../store';
import '../styles/globals.css';
import '../styles/index.css';

function App({ Component, pageProps, user }) {

  useEffect(() => {
    if (user) {
      store.getActions().setUser(user);
    }
    return () => { }
  }, [user])

  return (
    <StoreProvider store={store}>
      <Component {...pageProps} />
    </StoreProvider>
  )
}

App.getInitialProps = async (appContext) => {
  const appProps = await NextApp.getInitialProps(appContext);
  const req = appContext.ctx.req;
  const user = req ? req.user : null;

  return { ...appProps, user }
}

export default App
