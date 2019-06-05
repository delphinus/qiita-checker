import express from 'express'
import asyncHandler from 'express-async-handler'
import { check } from './check'
import { chk } from './chk'

const app = express()

app.get('/', asyncHandler(chk))
app.get('/check', asyncHandler(check))

const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`)
  console.log('Press Ctrl+C to quit.')
})
