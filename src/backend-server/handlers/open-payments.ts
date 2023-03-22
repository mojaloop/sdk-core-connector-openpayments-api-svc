// getPayeeProxyDisplayInfo
import Logger from '@mojaloop/central-services-logger'
import { Request, ResponseObject } from '@hapi/hapi'
import axios from 'axios'
import { StateResponseToolkit } from '../../shared/plugins/state'
import { IlpTransformer } from '../../shared/transformer'

async function IdTypeIncomingPaymentsPost(_context: unknown, _request: Request, h: StateResponseToolkit): Promise<ResponseObject>  {
  try {
    const destUrl = h.context.serviceConfig.endpoints.sdkUrl + '/transfers'

    // Construct the sdk payload here based on the _request.payload
    // TODO: optimize the following deep copy function
    const reqBody = JSON.parse(JSON.stringify(_request.payload))
    const amount = IlpTransformer.toAmountFromILPtoFspiop(reqBody.incomingAmount.value, reqBody.incomingAmount.assetScale) + ''
    const currency = reqBody.incomingAmount.assetCode
    const toIdType = _request.params.idType
    const toIdValue = _request.params.idValue
    // TODO: payer details are hardcoded. Need to fix that.
    const requestOut = {
      homeTransactionId: 'abc123',
      from: {
        idType: 'MSISDN',
        idValue: '22507008181'
      },
      to: {
        idType: toIdType,
        idValue: toIdValue
      },
      amountType: 'RECEIVE',
      currency,
      amount,
      transactionType: "TRANSFER",
      note: "string"
    }

    const headersOut = {

    }

    const { data, status } = await axios.post(
      destUrl,
      requestOut,
      {
        headers: headersOut,
      },
    );

    // Construct the response payload of open-payments based on `data` here
    const descriptionObject = {
      // name: data.to.displayName
      name: data.getPartiesResponse.body.name
    }
    const incomingAmount = IlpTransformer.toAmountFromFspiopToILP(data.quoteResponse.body.transferAmount.amount, data.quoteResponse.body.transferAmount.currency)
    const curDate = (new Date()).toISOString()
    const responseOut = {
      id: data.transferId,
      paymentPointer: "$Pch.Cnp",
      completed: false,
      incomingAmount,
      receivedAmount: {
        value: 0,
        assetCode: currency,
        assetScale: 0
      },
      description: JSON.stringify(descriptionObject),
      createdAt: curDate,
      updatedAt: curDate
    }

    // Save external ref callback url for later callback
    // Maybe the whole request
    // const kvs = h.getKVS();
    // await kvs.set(data.transferId, reqBody.externalRef)
    return h.response(responseOut).code(status)
  } catch (error) {
    if (axios.isAxiosError(error)) {
      Logger.error('error message: ', error.message);
      return h.response(error.message).code(500)
    } else {
      Logger.error('unexpected error: ', error);
      return h.response('An unexpected error occurred').code(500)
    }
  }
}

export default {
  IdTypeIncomingPaymentsPost
}
