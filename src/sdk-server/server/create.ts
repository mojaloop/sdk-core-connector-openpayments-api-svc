import Hapi from '@hapi/hapi'
import onValidateFail from '../../shared/handlers/onValidateFail'
import { validateRoutes } from '@mojaloop/central-services-error-handling'
import { ServiceConfig } from '../../shared/config'

// minimal server configuration
export interface ServerConfig {
  host: string
  port: number
  serviceConfig: ServiceConfig
}
// server app interface accessible in handlers and plugins via settings.app[key]
export interface ServerApp {
  serviceConfig: ServiceConfig
}

export default async function create(config: ServerConfig): Promise<Hapi.Server> {
  const server: Hapi.Server = Hapi.server({
    host: config.host,
    port: config.port,
    routes: {
      validate: {
        options: validateRoutes(),
        failAction: onValidateFail
      }
    },
    app: {
      serviceConfig: config.serviceConfig
    },
  })
  return server
}
