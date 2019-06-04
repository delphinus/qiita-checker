import { RequestHandler } from 'express'

export const check: RequestHandler = async (req, res) => {
  res
    .status(200)
    .send('Hello, World!')
    .end()
}
