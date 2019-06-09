import { promises } from 'fs'
import yaml from 'js-yaml'
import { isObject } from './isObject'

interface SecretsYAML {
  qiita: Qiita
  session: Session
}

interface Qiita {
  clientId: string
  clientSecret: string
}

interface Session {
  kind: string
  secret: string
}

const isSecretsYAML = (yaml: any): yaml is SecretsYAML =>
  typeof yaml !== 'undefined' &&
  yaml !== null &&
  isObject(yaml.qiita) &&
  typeof yaml.qiita.clientId === 'string' &&
  typeof yaml.qiita.clientSecret === 'string' &&
  isObject(yaml.session) &&
  typeof yaml.session.kind === 'string' &&
  typeof yaml.session.secret === 'string'

export class Secrets {
  private static instance: Secrets | undefined
  qiita: Qiita
  session: Session

  static async load() {
    if (!Secrets.instance) {
      const text = await promises.readFile('./secrets.yaml', 'utf8')
      const loaded = await yaml.safeLoad(text)
      if (!isSecretsYAML(loaded)) {
        throw new Error('invalid yaml')
      }
      Secrets.instance = new Secrets(loaded)
    }
    return Secrets.instance
  }

  private constructor(loaded: SecretsYAML) {
    this.qiita = loaded.qiita
    this.session = loaded.session
  }
}
