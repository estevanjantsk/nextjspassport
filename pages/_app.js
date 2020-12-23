import NextApp from 'next/app';
import '../styles/globals.css';

function App({ Component, pageProps, user, errorMessages }) {
  return <Component {...{ pageProps, user, errorMessages }} />
}

App.getInitialProps = async (appContext) => {
  const appProps = await NextApp.getInitialProps(appContext);
  const req = appContext.ctx.req;
  const user = req ? req.user : null;
  const errorMessages = req ? req.flash('error') : [];

  return { ...appProps, user, errorMessages }
}

export default App
