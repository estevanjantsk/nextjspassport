const express = require("express");
const session = require("express-session");
const flash = require("connect-flash");
const path = require("path");
const next = require("next");

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

const apiAuth = require('./api/auth')

const passport = require('./passport')
passport.initialize()

app.prepare().then(() => {
  const server = express()

  server.use(express.json());
  server.use(express.urlencoded({ extended: false }));

  server.use(express.static(path.join(__dirname, '../public')));
  server.use('/_next', express.static(path.join(__dirname, '../.next')));

  server.use(
    session({
      secret: 'dogs',
      resave: false,
      saveUninitialized: true,
      cookie: { maxAge: 86400000 },
    }),
    flash()
  )

  server.use(
    ...passport.middlewares()
  )

  server.use(function (req, res, next) {
    console.log('handling request for: ' + req.url);
    next();
  });

  server.use('/api/auth', apiAuth)

  server.all('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})