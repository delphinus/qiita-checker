import { promises } from 'fs'
import yaml from 'js-yaml'
import { isObject } from './isObject'

interface SecretsYAML {
  qiita: Qiita
}

interface Qiita {
  token: string
}

const isSecretsYAML = (yaml: any): yaml is SecretsYAML =>
  typeof yaml !== 'undefined' &&
  yaml !== null &&
  isObject(yaml.qiita) &&
  typeof yaml.qiita.token === 'string'

export class Secrets {
  qiita: Qiita

  static async load() {
    const text = await promises.readFile('./secrets.yaml', 'utf8')
    const loaded = await yaml.safeLoad(text)
    if (!isSecretsYAML(loaded)) {
      throw new Error('invalid yaml')
    }
    return new Secrets(loaded)
  }

  private constructor(loaded: SecretsYAML) {
    this.qiita = loaded.qiita
  }
}
