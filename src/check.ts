import { RequestHandler } from 'express'
import { Secrets } from './secrets'
import { Qiita } from './qiita'

export const check: RequestHandler = async (req, res) => {
  const secrets = await Secrets.load()
  // TODO: disable temporarily
  // const qiita = new Qiita(secrets.qiita.token)
  // const json = await qiita.get('/api/v2/authenticated_user/items')
  const json = {}
  res
    .status(200)
    .send(JSON.stringify(json))
    .end()
}
