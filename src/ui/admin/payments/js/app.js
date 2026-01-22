const {
  useReducer,
  useEffect 
} = wp.element
const {
  __experimentalGrid: Grid,
  __experimentalText: Text,
} = wp.components
import { apifetch } from 'uiutils/api'
import {
  reducer,
  initState
} from './state'

const useTableFields = [
  'user_mail',
  'post_id'
]

const tableFieldNames = {
  user_mail: 'Email',
  post_id: 'Page Id'
}

export default () => {

  const [state, dispatch ] = useReducer(
    reducer,
    initState
  )

  const refreshData = () => {

    apifetch('campus/payments/get')
    .then(response => response.json())
    .then(data => dispatch({
      pays: data
    }))
  }

  useEffect(() => {

    refreshData()
    
  }, [])

  return <div className="Payments">
    <div className="Tools">

    </div>
    <div className="List">
      <div className="Header">
        {
          state.pays.length ?
          Object.keys(state.pays[0])
          .reduce((fieldtitles, key) => {

            if(useTableFields.includes(key)) {

              fieldtitles.push({
                key: key,
                title: tableFieldNames[key]
              })
            }

            return fieldtitles
          }, [])
          .map(fieldtitle => <div className={`
            HColumn
            ${ fieldtitle.key }
          `}>
            { fieldtitle.title }
          </div>)
          .concat([
            <div className="HColumn Tools"></div>
          ])
          :
          <></>
        }
      </div>
      <div className="Pays">
        {
          state.pays.length ?
          state.pays
          .map(
            pay => <div className={`
              Pay 
              ${ pay.id }
            `}>
              { 
                Object.keys(pay)
                .reduce((fields, key) => {

                  if(useTableFields.includes(key)) {

                    fields.push({
                      key: key,
                      value: pay[key]
                    })
                  }

                  return fields

                }, [])    
                .map(pay => <div className={`
                  Column
                  ${ pay.key }
                `}>
                  { pay.value}
                </div>) 
                .concat([
                  <div className="Column Tools">{ pay.id }TOOLS</div>
                ])        
              }
            </div>
          )
          :
          <></>
        }

      </div>
    </div>
  </div>
};