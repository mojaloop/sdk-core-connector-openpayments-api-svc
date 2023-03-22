import { Logger as SDKLogger } from '@mojaloop/sdk-standard-components'

// default SDKLogger instance
export const logger = new SDKLogger.Logger()
export function createLogger(params?: SDKLogger.LoggerConstructorParams): SDKLogger.Logger {
  return new SDKLogger.Logger(params)
}
