import express from 'express'
import { check } from './check'
import { chk } from './chk'

const app = express()

app.get('/', chk)
app.get('/check', check)

const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`)
  console.log('Press Ctrl+C to quit.')
})
