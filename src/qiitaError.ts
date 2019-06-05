interface QiitaErrorJSON {
  message: string
  type: string
}

const invalidJSONError = { message: 'invalid JSON response', type: 'QIITA_CHECKER_INVALID_JSON' }

export class QiitaError extends Error {
  json: QiitaErrorJSON
  name: string
  message: string

  constructor(private text: string) {
    super()
    this.json = this.parse(text)
    this.message = this.json.message
    this.name = this.json.type
  }

  toString() {
    return `${this.name}: ${this.message}`
  }

  private parse(text: string) {
    let json: QiitaErrorJSON
    try {
      json = JSON.parse(text)
    } catch (e) {
      return invalidJSONError
    }
    if (this.isQiitaErrorJSON(json)) {
      return json
    }
    return invalidJSONError
  }

  private isQiitaErrorJSON(json: any): json is QiitaErrorJSON {
    return (
      typeof json !== 'undefined' &&
      json !== null &&
      typeof json.message === 'string' &&
      typeof json.text === 'string'
    )
  }
}
