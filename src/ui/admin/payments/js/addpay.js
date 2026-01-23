const {
  useReducer,
  useEffect 
} = wp.element
const {
  Button
} = wp.components
import PageSelector from './pageselector'
import MailEdit from './mailedit'

export default props => {

  const addPay = () => {

    props.dispatch({
      modal: {
        open: true,
        title: 'Añadir pago?',
        button: 'Si',
        confirm: () => {

          console.log('Confirm!!!')
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
          <PageSelector
            state={ props.state }
            dispatch={ props.dispatch}
          />
          :
          fieldtitle.key == 'user_mail' ?
          <MailEdit
            state={ props.state }
            dispatch={ props.dispatch}
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