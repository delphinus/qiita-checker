import { RequestHandler } from 'express'

export const chk: RequestHandler = (req, res) => {
  const sessionId = req.sessionID || 'unknown'
  res
    .status(200)
    .send(`Hello, World! ${sessionId}`)
    .end()
}
