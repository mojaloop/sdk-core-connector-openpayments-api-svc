// getPayeeProxyDisplayInfo
import Logger from '@mojaloop/central-services-logger'
import { Request, ResponseObject } from '@hapi/hapi'
import axios from 'axios'
import { StateResponseToolkit } from '../../shared/plugins/state'
import { IlpTransformer } from '../../shared/transformer'

async function WebHookIncomingPaymentEvent(_context: unknown, _request: Request, h: StateResponseToolkit): Promise<ResponseObject>  {
  try {
    // kick off an asynchronous operation to handle the request
    (async () => {
      try {
        // TODO: optimize the following deep copy function
        const reqBody = JSON.parse(JSON.stringify(_request.payload))
    
        // Assuming the id is direct SDK transfer ID. If it should be in some other format, we may need to parse it here
        const sdkTransferId = reqBody.data.incomingPayment.id
        const destUrl = h.context.serviceConfig.endpoints.sdkUrl + '/transfers/' + sdkTransferId
    
        // Construct the sdk payload here based on the _request.payload
        const requestOut = {
          acceptQuote: true
        }
    
        const headersOut = {}
    
        const { data, status } = await axios.put(
          destUrl,
          requestOut,
          {
            headers: headersOut,
          },
        );
    
        // TODO: Get the callback URL from redis
        // TODO: Make a callback request to the URL with rafiki webhook outbound payment format
        let transferStatus = 'FAILED'
        if (data.currentState === 'COMPLETED') {
          transferStatus = 'COMPLETED'
        }
        const receiveAmount = IlpTransformer.toILPAmountFromFspiopAmount(data.quoteResponse.body.payeeReceiveAmount.amount, data.quoteResponse.body.payeeReceiveAmount.currency)
        const curDate = (new Date()).toISOString()
        const callbackReqBody = {
          id: sdkTransferId,
          type: "OutgoingPaymentCreated",
          data: {
            payment: {
              id: sdkTransferId,
              paymentPointerId: reqBody.data.incomingPayment.paymentPointerId,
              description: reqBody.data.incomingPayment.description,
              receiver: "string",
              sendAmount: reqBody.data.incomingPayment.incomingAmount,
              receiveAmount,
              completed: true,
              externalRef: "string",
              status: transferStatus,
              createdAt: curDate,
              updatedAt: curDate
            }
          }
        }
        const callbackReqHeaders = {}
        // TODO: Need to send a http call here
        const kvs = h.getKVS();
        const callbackUrl = (await kvs.get(sdkTransferId)) as string
        const callbackResponseObj = await axios.post(
          callbackUrl,
          callbackReqBody,
          {
            headers: callbackReqHeaders,
          },
        )
        console.log(JSON.stringify(callbackReqBody, null, 4))
        console.log(JSON.stringify(callbackResponseObj, null, 4))
      } catch (error) {
        // TODO: What to do incase of error. Do we need to make an error callback?
        if (axios.isAxiosError(error)) {
          Logger.error('error message: ', error.message);
        } else {
          Logger.error('unexpected error: ', error);
        }
      }
    })();
    return h.response().code(200)
  } catch (error1) {
    Logger.error('error: ', error1);
    return h.response('An unexpected error occurred').code(500)
  }
}

export default {
  WebHookIncomingPaymentEvent
}
