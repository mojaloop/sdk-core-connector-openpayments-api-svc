import SharedHandlers from '../../shared/handlers'
import OpenPayments from './open-payments'

export default {
  HealthGet: SharedHandlers.HealthGet,
  "create-incoming-payment-id-type-value": OpenPayments.IdTypeCreateIncomingPayment,
  "create-quote-id-type-value": OpenPayments.IdTypeCreateQuote,
  "create-outgoing-payment-id-type-value": OpenPayments.IdTypeCreateOutgoingPayment
}
