import { Request, ResponseToolkit } from '@hapi/hapi'
import { logger } from '../logger'

export default async function onPreHandler(request: Request, h: ResponseToolkit): Promise<symbol> {
  logger.info(`Request: ${request}`)
  return h.continue
}
