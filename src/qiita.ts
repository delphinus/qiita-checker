import { QiitaError } from './qiitaError'
import got from 'got'

export class Qiita {
  origin = 'https://qiita.com'

  constructor(private token: string) {}

  async get(rawPath: string, query?: { [key: string]: string }) {
    const search = new URLSearchParams(query).toString()
    const path = search === '' ? rawPath : `${rawPath}?${search}`
    const url = `${this.origin}/${path}`
    const headers = this.headers()
    const result = await got(url, { headers })
    const status = result.statusCode
    const body = result.body
    if (typeof status === 'undefined' || status > 299) {
      throw new QiitaError(body)
    }
    try {
      const json = JSON.parse(body)
      return json
    } catch (e) {
      console.log(body)
      throw new Error('response is OK, but corrupted')
    }
  }

  headers() {
    return { Authorization: `Bearer ${this.token}` }
  }
}
