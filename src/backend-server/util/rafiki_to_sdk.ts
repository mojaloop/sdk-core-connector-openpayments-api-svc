// import { SDKSchemeAdapter } from '@mojaloop/api-snippets';
// import { Schemas } from '../interface/types';
//
// // Initial request but we are missing payer details.
// export function incomingPaymentsRequestToSDKTransferRequest(
//     request: Schemas.IDTypeIncomingPaymentsPostRequest
//   ): SDKSchemeAdapter.V2_0_0.Outbound.Types.transferRequest {
//
//   const sdkTransferPostRequest: SDKSchemeAdapter.V2_0_0.Outbound.Types.transferRequest = {
//   }
//   return sdkTransferPostRequest
// }
//
// export function SDKTransferResponseToRafikiQuoteResponse(
//   request: SDKSchemeAdapter.V2_0_0.Outbound.Types.transferResponse
// ): Schemas.QuoteResponse {
//   const rafikiQuoteResponse: Schemas.QuoteResponse = {
//   }
//   return rafikiQuoteResponse
// }
//
// // We shouldn't really need this.
// export function RafikiWebHookIncomingPaymentRequestToSDKAcceptQuoteRequest(
//   request: Schemas.RafikiWebHookIncomingPaymentRequest
// ): SDKSchemeAdapter.V2_0_0.Outbound.Types.transferContinuationAcceptQuote {
//   return {
//     acceptQuote: true
//   }
// }
//
// export function SDKTransferResponseToRafikiWebHookOutgoingPaymentRequest(
//   request: SDKSchemeAdapter.V2_0_0.Outbound.Types.transferResponse
// ): Schemas.RafikiWebHookOutgoingPaymentRequest {
//   const rafikiCallback: Schemas.RafikiWebHookOutgoingPaymentRequest = {
//   }
//   return rafikiCallback
// }
