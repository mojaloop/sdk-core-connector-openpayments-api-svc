import SharedHandlers from '../../shared/handlers'
import Transfers from './transfers'

export default {
  HealthGet: SharedHandlers.HealthGet,
  PostTransfers: Transfers.post
}
