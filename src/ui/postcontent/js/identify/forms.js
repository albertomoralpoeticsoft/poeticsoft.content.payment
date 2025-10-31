import formidentify from './form-identify'
import formsconfirmcode from './form-confirmcode'
import formregistershould from './form-register-should'
import formsregisterwant from './form-register-want'
import formsregisterconfirm from './form-register-confirm'

const forms = {
  identify: formidentify,
  registershould: formregistershould,
  registerwant: formsregisterwant,
  registerconfirm: formsregisterconfirm,
  confirmcode: formsconfirmcode
}

export default data => forms[data.form](data)