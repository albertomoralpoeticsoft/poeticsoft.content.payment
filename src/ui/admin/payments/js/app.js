const {
  useReducer,
  useEffect 
} = wp.element
const {
  Button
} = wp.components
import { apifetch } from 'uiutils/api'
import {
  reducer,
  initState
} from './state'
import Pays from './pays'
import AddPay from './addpay'
import Modal from './modal'
import {
  pagesTree
} from './utils'

const Header = props => {

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
            onClick={ props.refreshAll }
          >
            Refrescar
          </Button> 
        </div>
      ])
      :
      <></>
    }
  </div>
}

export default () => {

  const [state, dispatch ] = useReducer(
    reducer,
    initState
  )

  const refreshPages = () => {

    apifetch('campus/pages')
    .then(response => response.json())
    .then(pages => dispatch({
      campuspages: pages,
      campuspagesbyid: pages
      .reduce((pagesbyid, page) => {
        pagesbyid[page.id] = page
        return pagesbyid
      }, {}),
      campuspagestree: pagesTree(pages)
    }))
  }

  const refreshData = () => {

    apifetch('campus/payments/get')
    .then(response => response.json())
    .then(data => dispatch({
      pays: data
    }))
  }

  const refreshall = () => {

    refreshData()
    refreshPages()    
  }

  useEffect(() => {

    refreshall()
    
  }, [])

  return <div className="Payments">
    <div className="List">
      <Header
        state={ state }
        dispatch={ dispatch }
      />
      <Pays
        state={ state }
        dispatch={ dispatch }
      />    
    </div>
    <AddPay
      state={ state }
      dispatch={ dispatch }
      refreshAll={ refreshall }
    />
    <Modal
      state={ state }
      dispatch={ dispatch }
    />
  </div>
};