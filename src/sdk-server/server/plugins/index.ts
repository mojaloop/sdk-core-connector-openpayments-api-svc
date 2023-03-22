import { Server, ServerRoute } from '@hapi/hapi'
import Blip from 'blipp'
import ErrorHandling from '@mojaloop/central-services-error-handling'
import OpenAPI from './openAPI'
import APIDocumentation from './apiDoc'
import { StatePlugin } from '../../../shared/plugins/state'
import { Util } from '@mojaloop/central-services-shared'
import Vision from '@hapi/vision'

async function register(server: Server): Promise<Server> {
  const openapiBackend = await OpenAPI.initialize()

  let plugins = [
    StatePlugin,
    Util.Hapi.OpenapiBackendValidator,
    openapiBackend,
    APIDocumentation,
    Vision,
    Blip,
    ErrorHandling,
  ]

  // filter out any null values
  plugins = plugins.filter(function (e) {
    return e != null
  })

  await server.register(plugins)

  // use as a catch-all handler
  server.route({
    method: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    path: '/{path*}',
    handler: (req, h): ServerRoute => {
      return openapiBackend.options.openapi.handleRequest(
        {
          method: req.method,
          path: req.path,
          body: req.payload,
          query: req.query,
          headers: req.headers
        },
        req,
        h
      )
    }
  })

  return server
}

export default {
  register
}
