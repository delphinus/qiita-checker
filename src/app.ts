import express, { RequestHandler, ErrorRequestHandler } from 'express'
import { check } from './check'
import { chk } from './chk'

const app = express()

const awaitHandler = (handler: RequestHandler): RequestHandler => async (req, res, next) =>
  Promise.resolve(handler(req, res, next)).catch(next)

app.get('/', awaitHandler(chk))
app.get('/check', awaitHandler(check))

const errorLogger: ErrorRequestHandler = (err, req, res, next) => {
  console.error(err)
  next(err)
}

const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`)
  console.log('Press Ctrl+C to quit.')
})
