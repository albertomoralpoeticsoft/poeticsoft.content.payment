const {
  __experimentalInputControl: InputControl,
  Button
} = wp.components
const {
  useState,
  useEffect
} = wp.element
import {
  validateMail
} from './utils'
import { 
  apifetch
} from 'uiutils/api'

export default props => {

  const [editing, setEditing] = useState(false)
  const [email, setMail] = useState(false)
  const [mailchanged, setMailchanged] = useState(false)

  const edit = () => {

    setEditing(true)
  }

  const close = () => {
    
    setEditing(false)
  }

  const save = () => {

    if(!validateMail(email)) {

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

    props.dispatch({
      modal: {
        open: true,
        title: 'Modificar mail',
        text: `Seguro que quieres modificar el maiil de acceso para esta página?`,
        button: `Si`,
        confirm: () => {  
      
          apifetch(
            'campus/payments/update',
            {
              method: 'POST',
              body: {
                id: props.pay.id,
                user_mail: email
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

            setEditing(false)

            props.refreshAll()
          })
        }
      }
    })
  }

  useEffect(() => {

    setMailchanged(props.field.value != email)

  }, [email])

  useEffect(() => {

    setMail(props.field.value)

  }, [])

  return <div className="Edit mail">    
    {
      props.canedit ? 
      editing ?
      <>   
        {
          mailchanged ?
          <Button
            icon="saved"
            onClick={ save }
          />
          :
          <Button
            icon="no"
            onClick={ close }
          />
        }
        <InputControl
          value={ email }
          onChange={ 
            value => setMail(value)
          }
        />
      </>
      :
      <>
        <Button
          icon="edit"
          onClick={ edit }
        />
        <span>{ props.field.value }</span>
      </>
      :
      <span>{ props.field.value }</span>
    }
  </div>
}

