const {
  Button
} = wp.components
import { apifetch } from 'uiutils/api'

const EditMail = props => {

  return <div className="Edit mail">
    <Button
      icon="edit"
    />
    <span>{ props.pay.value }</span>
  </div>
}

const EditPost = props => {

  return <div className="Edit Post">
    <Button
      icon="edit"
    />
    <span>{ props.state.campuspagesbyid[props.pay.value].title }</span>
  </div>
}

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
        Object.keys(props.state.campuspagesbyid).length
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
            .map(pay => <div className={`
              Column Field
              ${ pay.key }
            `}>
              { 
                pay.key == 'post_id' ?               
                <EditPost
                  pay={ pay }
                  state={ props.state }
                  dispatch={ props.dispatch } 
                />
                : 
                <EditMail
                  pay={ pay }
                  state={ props.state }
                  dispatch={ props.dispatch } 
                />
              }
            </div>) 
            .concat([<div className="Column Tools">
              <Button
                variant="secondary"
                onClick={ () => remove(pay) }
              >
                Eliminar
              </Button>
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