import { RequestHandler } from 'express'
import { Session } from './session'

export const index: RequestHandler = (req, res) => {
  const session = Session.load(req)
  res.render('index.ejs', {
    hasLoggedIn: session.hasLoggedIn()
  })
}
