const express = require("express");
const session = require("express-session")
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

  server.use(
    session({
      secret: 'dogs',
      resave: false,
      saveUninitialized: true,
      cookie: { maxAge: 86400000 },
    }),
    express.json(),
    express.urlencoded({ extended: false })
  )

  server.use(
    ...passport.middlewares()
  )

  server.use('/api/auth', apiAuth)

  server.all('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})