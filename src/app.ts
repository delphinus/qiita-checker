import express, { RequestHandler, ErrorRequestHandler } from 'express'
import session from 'express-session'
import { Firestore } from '@google-cloud/firestore'
import { FirestoreStore } from '@google-cloud/connect-firestore'
import { check } from './check'
import { chk } from './chk'
import { index } from './index'
import { Secrets } from './secrets'

const app = express()
app.set('view engine', 'ejs')
const awaitHandler = (handler: RequestHandler): RequestHandler => async (req, res, next) =>
  Promise.resolve(handler(req, res, next)).catch(next)
const PORT = process.env.PORT || 8080
const errorLogger: ErrorRequestHandler = (err, req, res, next) => {
  console.error(err)
  next(err)
}
;(async () => {
  const secrets = await Secrets.load()
  app.use(
    session({
      store: new FirestoreStore({
        dataset: new Firestore({
          kind: secrets.session.kind
        })
      }),
      secret: secrets.session.secret,
      resave: false,
      saveUninitialized: true
    })
  )

  app.get('/', awaitHandler(index))
  app.get('/chk', awaitHandler(chk))
  app.get('/check', awaitHandler(check))
  app.use(errorLogger)

  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`)
    console.log('Press Ctrl+C to quit.')
  })
})()
