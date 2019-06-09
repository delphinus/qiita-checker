import { promises } from 'fs'
import yaml from 'js-yaml'
import { isObject } from './isObject'

interface SecretsYAML {
  session: Session
}

interface Session {
  secret: string
}

const isSecretsYAML = (yaml: any): yaml is SecretsYAML =>
  typeof yaml !== 'undefined' &&
  yaml !== null &&
  isObject(yaml.session) &&
  typeof yaml.session.secret === 'string'

export class Secrets {
  session: Session

  static async load() {
    const text = await promises.readFile('./secrets.yaml', 'utf8')
    const loaded = await yaml.safeLoad(text)
    if (!isSecretsYAML(loaded)) {
      throw new Error('invalid yaml')
    }
    return new Secrets(loaded)
  }

  private constructor(loaded: SecretsYAML) {
    this.session = loaded.session
  }
}
