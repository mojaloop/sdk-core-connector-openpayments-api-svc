import Path from 'path'
import { Util } from '@mojaloop/central-services-shared'

export default {
  plugin: Util.Hapi.APIDocumentation,
  options: {
    documentPath: Path.resolve(__dirname, '../../interface/api.yaml')
  }
}
