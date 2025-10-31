import formshouldpay from './form-shouldpay'
import formpaychannel from './form-paychannel'
import formconfirmpaystripe from './form-confirmpay-stripe'
import formconfirmpaystripeend from './form-confirmpay-stripe-end'
import formconfirmpaytransfer from './form-confirmpay-transfer'
import formconfirmpaytransferend from './form-confirmpay-transfer-end'
import formconfirmpaybizum from './form-confirmpay-bizum'
import formconfirmpaybizumend from './form-confirmpay-bizum-end'

const forms = {
  shouldpay: formshouldpay,
  paychannel: formpaychannel,
  confirmpaystripe: formconfirmpaystripe,
  confirmpaystripeend: formconfirmpaystripeend,
  confirmpaytransfer: formconfirmpaytransfer,
  confirmpaytransferend: formconfirmpaytransferend,
  confirmpaybizum: formconfirmpaybizum,
  confirmpaybizumend: formconfirmpaybizumend
}

export default data => forms[data.form](data)