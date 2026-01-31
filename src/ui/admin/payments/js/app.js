const {
  useReducer,
  useEffect 
} = wp.element
import { apifetch } from 'uiutils/api'
import {
  reducer,
  initState
} from './state'
import Header from './header'
import Pays from './pays'
import AddPay from './addpay'
import Modal from './modal'
import Messages from './messages'
import {
  pagesTree,
  showMessage
} from './utils'

export default () => {

  const accesstype = poeticsoft_content_payment_admin_accesstype_origin
  const canedit = [
    'mailrelay'
  ].includes(accesstype)

  const [state, dispatch ] = useReducer(
    reducer,
    initState
  )

  const refreshPayments = () => {

    dispatch({
      pays: []
    }) 

    apifetch('campus/payments/get')
    .then(response => response.json())
    .then(data => {

      if(data.result == 'error') {                      

        showMessage(
          dispatch,
          data.reason,
          'Error'
        )
        
      } else {  
      
        dispatch({
          pays: data.data
        })                      

        showMessage(
          dispatch,
          'Accesos cargados',
          'info'
        )
      }
    })
  }

  const refreshPages = (refreshPaymentsAfter) => {

    apifetch('campus/pages')
    .then(response => response.json())
    .then(data => {

      if(data.result == 'error') {                      

        showMessage(
          dispatch,
          data.reason,
          'Error'
        )

      } else { 
      
        dispatch({
          campuspages: data.data,
          campuspagesbyid: data.data
          .reduce((pagesbyid, page) => {
            pagesbyid[page.id] = page
            return pagesbyid
          }, {}),
          campuspagestree: [{
            value: 0,
            label: 'Selecciona página'
          }]
          .concat(pagesTree(data.data))
        })                             

        showMessage(
          dispatch,
          'Páginas cargadas',
          'info'
        )

        refreshPaymentsAfter && refreshPayments()
      }
    })
  }

  const refreshall = () => {

    refreshPages(true)    
  }

  useEffect(() => {

    refreshall()
    
  }, [])

  return <div className="Payments">
    <div className="List">
      <Header
        state={ state }
        dispatch={ dispatch }
        refreshAll={ refreshall }
      />
      <Pays
        state={ state }
        dispatch={ dispatch }
        refreshAll={ refreshall }
        canedit={ canedit }
      />    
    </div>
    {
      canedit &&
      <AddPay
        state={ state }
        dispatch={ dispatch }
        refreshAll={ refreshall }
      />
    }
    <Modal
      size="small"
      state={ state }
      dispatch={ dispatch }
    />
    <Messages
      state={ state }
      dispatch={ dispatch }
    />
  </div>
};