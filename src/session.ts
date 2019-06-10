import { isObject } from './isObject'

interface SessionData extends Express.Session {
  id: string
  qiita: Qiita
}

interface Qiita {
  clientId: string
  token: string
}

export class Session {
  private static instance: Session
  private session: Express.Session
  id: string
  qiita: Qiita

  static load(req: Express.Request) {
    if (!req.session) {
      throw new Error('req has no session')
    }
    return new Session(req.session)
  }

  constructor(session: Express.Session) {
    this.session = session
    this.id = session.id
    this.qiita = session.qiita
  }

  hasLoggedIn() {
    return (
      typeof this.session.id === 'string' &&
      this.session.qiita !== null &&
      typeof this.session.qiita !== 'undefined' &&
      typeof this.session.qiita.clientId === 'string' &&
      typeof this.session.qiita.token === 'string'
    )
  }
}
