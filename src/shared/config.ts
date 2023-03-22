import Convict from 'convict'
import PACKAGE from '../../package.json'
import path from 'path'

export { PACKAGE }

// interface to represent service configuration
export interface ServiceConfig {
  env: string
  requestProcessingTimeoutSeconds: number,
  backendServer: {
    host: string
    port: number
    corsWhiteList: string[]
    allowCredentials: boolean
  },
  sdkServer: {
    host: string
    port: number
    corsWhiteList: string[]
    allowCredentials: boolean
  },
  endpoints: {
    backendUrl: string
    sdkUrl: string
  },
  inspect: {
    depth: number
    showHidden: boolean
    color: boolean
  }
}

// Declare configuration schema, default values and bindings to environment variables
export const ConvictConfig = Convict<ServiceConfig>({
  env: {
    doc: 'The application environment.',
    format: ['default', 'production', 'development', 'test', 'integration', 'e2e'],
    default: 'default',
    env: 'NODE_ENV'
  },
  backendServer: {
    host: {
      doc: 'The Hostname/IP address to bind.',
      format: '*',
      default: '0.0.0.0',
      env: 'BACKEND_SERVER_HOST'
    },
    port: {
      doc: 'The port to bind.',
      format: 'port',
      default: 3000,
      env: 'BACKEND_SERVER_PORT'
    },
    corsWhiteList: {
      doc: 'corsWhiteList',
      format: 'Array',
      default: ['*'],
      env: 'BACKEND_SERVER_CORS_WHITELIST'
    },
    allowCredentials: {
      doc: 'allowCredentials',
      format: 'Boolean',
      default: false,
      env: 'BACKEND_SERVER_ALLOW_CREDENTIALS'
    },
  },
  sdkServer: {
    host: {
      doc: 'The Hostname/IP address to bind.',
      format: '*',
      default: '0.0.0.0',
      env: 'SDK_SERVER_HOST'
    },
    port: {
      doc: 'The port to bind.',
      format: 'port',
      default: 3003,
      env: 'SDK_SERVER_PORT'
    },
    corsWhiteList: {
      doc: 'corsWhiteList',
      format: 'Array',
      default: ['*'],
      env: 'SDK_SERVER_CORS_WHITELIST'
    },
    allowCredentials: {
      doc: 'allowCredentials',
      format: 'Boolean',
      default: false,
      env: 'SDK_SERVER_ALLOW_CREDENTIALS'
    },
  },
  endpoints: {
    backendUrl: {
      doc: 'The endpoint of Backend',
      format: '*',
      default: 'http://localhost:3003',
      env: 'ENDPOINTS_BACKEND_URL'
    },
    sdkUrl: {
      doc: 'The endpoint for sdk',
      format: '*',
      default: 'http://localhost:4001',
      env: 'ENDPOINTS_SDK_URL'
    },
  },
  requestProcessingTimeoutSeconds: {
    doc: 'The timeout for waiting for a response to a request',
    env: 'REQUEST_PROCESSING_TIMEOUT_SECONDS',
    default: 30
  },
  inspect: {
    depth: {
      doc: 'Inspection depth',
      format: 'nat',
      env: 'INSPECT_DEPTH',
      default: 4
    },
    showHidden: {
      doc: 'Show hidden properties',
      format: 'Boolean',
      default: false
    },
    color: {
      doc: 'Show colors in output',
      format: 'Boolean',
      default: true
    }
  },
})

// Load environment dependent configuration
const env = ConvictConfig.get('env')
const configFile = process.env.CONFIG_FILE || path.join(__dirname, `../../../config/${env}.json`)
ConvictConfig.loadFile(configFile)

// Perform configuration validation
ConvictConfig.validate({ allowed: 'strict' })

// extract simplified config from Convict object
const config: ServiceConfig = {
  env: ConvictConfig.get('env'),
  backendServer: ConvictConfig.get('backendServer'),
  sdkServer: ConvictConfig.get('sdkServer'),
  endpoints: ConvictConfig.get('endpoints'),
  requestProcessingTimeoutSeconds: ConvictConfig.get('requestProcessingTimeoutSeconds'),
  inspect: ConvictConfig.get('inspect'),
}

export default config
