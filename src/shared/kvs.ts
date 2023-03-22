import { RedisConnection } from './redis-connection'
import { promisify } from 'util'

export class InvalidKeyError extends Error {
  constructor() {
    super('key should be non empty string')
  }

  static throwIfInvalid(key: string): void {
    if (!(key?.length > 0)) {
      throw new InvalidKeyError()
    }
  }
}

// KVS class deliver simple key - value storage backed by Redis
export class KVS extends RedisConnection {
  // retrieve the value for given key
  // if there is no value for given key 'undefined' is returned
  async get<T>(key: string): Promise<T | undefined> {
    InvalidKeyError.throwIfInvalid(key)

    const asyncGet = promisify(this.client.get)
    const value: string | null | undefined = await asyncGet.call(this.client, key)

    return typeof value === 'string' ? JSON.parse(value) : undefined
  }

  // store the value for given key
  async set<T>(key: string, value: T): Promise<boolean> {
    InvalidKeyError.throwIfInvalid(key)

    const asyncSet = promisify(this.client.set)
    const stringified = JSON.stringify(value)

    return asyncSet.call(this.client, key, stringified) as Promise<boolean>
  }

  // removes the value for given key
  async del(key: string): Promise<boolean> {
    InvalidKeyError.throwIfInvalid(key)
    return this.client.del(key)
  }

  // check is any data for given key
  async exists(key: string): Promise<boolean> {
    // there is problem with TS typings
    // so using `promisify` isn't working
    return new Promise((resolve, reject) => {
      this.client.exists(key, (err: unknown, result: number) => {
        if (err) {
          return reject(err)
        }
        resolve(result === 1)
      })
    })
  }
}
