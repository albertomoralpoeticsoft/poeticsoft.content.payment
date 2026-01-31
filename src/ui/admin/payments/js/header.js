const {
  useReducer,
  useEffect 
} = wp.element
const {
  Button
} = wp.components

import { showMessage } from './utils'
import { apifetch } from 'uiutils/api'

export default props => {

  const loadAlumnos = () => {

    props.dispatch({
      modal: {
        open: true,
        title: 'Cargar alumnos',
        text: 'Quieres cargar la lista de alumnos? Esto sustituirá todos los accesos.',
        button: 'Si',
        confirm: () => {

          props.dispatch({
            modal: {
              text: 'Actualizando lista de accesos.'
            }
          })

          apifetch('campus/payments/refresh')
          .then(response => response.json())
          .then(data => {

            props.dispatch({
              modal: {
                open: false 
              }
            })

            if(data.result == 'error') {              

              showMessage(
                props.dispatch,
                data.reason,
                'Error'
              )

            } else if (data.result == 'info') {

              showMessage(
                props.dispatch,
                data.reason,
                'Info'
              )

            } else {

              showMessage(
                props.dispatch,
                'Accesos actualizados',
                'Info'
              )
            
              setTimeout(props.refreshAll, 2000)
            }
          })
        }
      }
    })
  }

  return <div className="Header">
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
        { fieldtitle.title }
      </div>)
      .concat([
        <div className="Column Tools">           
          <Button
            variant="primary"
            onClick={ loadAlumnos }
          >
            Recargar
          </Button> 
        </div>
      ])
      :
      <div className="Column Tools">           
        <Button
          className="LoadAlumnos"
          variant="primary"
          onClick={ loadAlumnos }
        >
          Recargar
        </Button> 
      </div>
    }
  </div>
}
