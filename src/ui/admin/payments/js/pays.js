const {
  __experimentalInputControl: InputControl,
  Button
} = wp.components
import { 
  apifetch
} from 'uiutils/api'
import EditMail from './pays-editmail'
import EditPostid from './pays-editpostid'

export default props => {

  const remove = pay => {

    props.dispatch({
      modal: {
        open: true,
        title: 'Eliminar pago?',
        text: 'Estás seguro de eliminar este pago? el usuario perderá el acceso a esta página.',
        button: 'Si',
        confirm: () => {

          apifetch(
            'campus/payments/delete',
            {
              method: 'POST',
              body: {
                id: pay.id
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
  
  return <div className="Pays">
    {
      (
        (
          !props.canedit
          ||
          props.canedit && caneditObject.keys(props.state.campuspagesbyid).length
        )
        &&
        props.state.pays.length
      ) ?
      props.state.pays
      .map(
        pay => <div className={`
          Pay 
          ${ pay.id }
        `}>
          { 
            Object.keys(pay)
            .reduce((fields, key) => {

              if(props.state.tableFields.includes(key)) {

                fields.push({
                  key: key,
                  value: pay[key]
                })
              }

              return fields

            }, [])    
            .map(field => <div className={`
              Column Field
              ${ field.key }
            `}>
              { 
                field.key == 'post_id' ?               
                <EditPostid
                  pay={ pay }
                  field={ field }
                  state={ props.state }
                  dispatch={ props.dispatch } 
                  refreshAll={ props.refreshAll }
                  canedit={ props.canedit }
                />
                : 
                <EditMail
                  pay={ pay }
                  field={ field }
                  state={ props.state }
                  dispatch={ props.dispatch }  
                  refreshAll={ props.refreshAll }
                  canedit={ props.canedit }
                />
              }
            </div>) 
            .concat([<div className="Column Tools">
              {
                props.canedit &&
                <Button
                  variant="secondary"
                  onClick={ () => remove(pay) }
                >
                  Eliminar
                </Button>
              }
            </div>])        
          }
        </div>
      )
      :
      <div className="Loading">
        Cargando datos...
      </div>
    }
  </div>
}