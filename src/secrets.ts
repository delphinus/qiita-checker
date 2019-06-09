import { promises } from 'fs'
import yaml from 'js-yaml'
import { isObject } from './isObject'

interface SecretsYAML {
  session: Session
}

interface Session {
  kind: string
  secret: string
}

const isSecretsYAML = (yaml: any): yaml is SecretsYAML =>
  typeof yaml !== 'undefined' &&
  yaml !== null &&
  isObject(yaml.session) &&
  typeof yaml.session.kind === 'string' &&
  typeof yaml.session.secret === 'string'

export class Secrets {
  private static instance: Secrets | undefined
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
    this.session = loaded.session
  }
}
