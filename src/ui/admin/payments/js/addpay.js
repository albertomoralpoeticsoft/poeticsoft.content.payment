const {
  Button,
  SelectControl,
  __experimentalInputControl: InputControl,
} = wp.components
import {
  validateMail
} from './utils'
import { 
  apifetch
} from 'uiutils/api'

export default props => {

  const addPay = () => {

    if(!validateMail(props.state.newpay.email)) {

      props.dispatch({
        modal: {
          open: true,
          title: 'Error',
          text: 'Escribe un mail válido',
          button: 'Ok, lo hago',
          confirm: () => {

            props.dispatch({
              modal: {
                open: false
              }
            })
          }
        }
      })

      return
    }

    if(!props.state.newpay.postid) {

      props.dispatch({
        modal: {
          open: true,
          title: 'Error',
          text: 'Selecciona página',
          button: 'Ok, lo hago',
          confirm: () => {

            props.dispatch({
              modal: {
                open: false
              }
            })
          }
        }
      })

      return
    }

    props.dispatch({
      modal: {
        open: true,
        title: 'Añadir pago',
        text: `Seguro que quieres dar acceso a esta página al mail <strong>${ props.state.newpay.email }</strong>`,
        button: `Si, añadir pago`,
        confirm: () => {  
      
          apifetch(
            'campus/payments/create',
            {
              method: 'POST',
              body: {
                user_mail: props.state.newpay.email,
                post_id: props.state.newpay.postid
              }
            }
          )
          .then(response => response.json())
          .then(data => {

            props.dispatch({
              modal: {
                open: false 
              }
            })

            props.refreshAll()
          })
        }
      }
    })
  }

  return <div className="AddPay">
    {
      props.state.pays.length ?
      Object.keys(props.state.pays[0])
      .reduce((fieldtitles, key) => {

        if(props.state.tableFields.includes(key)) {

          fieldtitles.push({
            key: key,
            title: props.state.tableFieldTitles[key]
          })
        }

        return fieldtitles
      }, [])
      .map(fieldtitle => <div className={`
        Column Field
        ${ fieldtitle.key }
      `}>
        { 
          fieldtitle.key == 'post_id' ?
          <SelectControl 
            value={ props.state.newpay.postid }
            options={ props.state.campuspagestree }
            onChange={
              value => props.dispatch({
                newpay: {
                  postid: value
                }
              })
            }
          />
          :
          fieldtitle.key == 'user_mail' ?
          <InputControl
            value={ props.state.newpay.email }
            onChange={ 
              value => props.dispatch({
                newpay: {
                  email: value
                }
              })
            }
          />
          :
          <></>
        }
      </div>)
      .concat([
        <div className="Column Tools">
          <Button
            variant="primary"
            onClick={ addPay }
          >
            Añadir
          </Button>
        </div>
      ])
      :
      <></>
    }
  </div>
}