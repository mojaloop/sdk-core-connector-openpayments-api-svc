import {  Logger as SDKLogger } from '@mojaloop/sdk-standard-components'
import { ResponseToolkit, Server } from '@hapi/hapi'
import { logger } from '../logger'
import { KVS } from '../kvs'
import config from '../config'
import { RedisConnectionConfig } from '../redis-connection'

export interface StateResponseToolkit extends ResponseToolkit {
  getLogger: () => SDKLogger.Logger,
  getKVS: () => KVS
}

export const StatePlugin = {
  version: '1.0.0',
  name: 'StatePlugin',
  once: true,

  register: async (server: Server): Promise<void> => {
    // KVS & PubSub are using the same Redis instance
    // const connection: RedisConnectionConfig = {
    //   host: config.redis.host,
    //   port: config.redis.port,
    //   timeout: config.redis.timeout,
    //   logger
    // }
    // const kvs = new KVS(connection)
    // await Promise.all([kvs.connect()])

    try {
      // prepare toolkit accessors
      // server.decorate('toolkit', 'getKVS', (): KVS => kvs)
      server.decorate('toolkit', 'getLogger', (): SDKLogger.Logger => logger)
      // disconnect from redis when server is stopped
      // server.events.on('stop', async () => {
      //   await Promise.allSettled([kvs.disconnect()])
      //   logger.info('StatePlugin: Server stopped -> disconnecting KVS')
      // })
    } catch (err) {
      logger.error('StatePlugin: unexpected exception during plugin registration')
      logger.error(err)
      logger.error('StatePlugin: exiting process')
      process.exit(1)
    }
  }
}
