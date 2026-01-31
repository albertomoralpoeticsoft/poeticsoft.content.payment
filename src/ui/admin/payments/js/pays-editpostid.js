const {
  __experimentalInputControl: InputControl,
  Button,
  SelectControl
} = wp.components
const {
  useState,
  useEffect
} = wp.element
import { 
  apifetch
} from 'uiutils/api'

export default props => {

  const [editing, setEditing] = useState(false)
  const [postid, setPostid] = useState(false)
  const [postidchanged, setPostidchanged] = useState(false)

  const edit = () => {

    setEditing(true)
  }

  const close = () => {
    
    setEditing(false)
  }
  
  const save = () => {

    if(!postid) {

      props.dispatch({
        modal: {
          open: true,
          title: 'Error',
          text: 'Selecciona una página',
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
        title: 'Cambiar página',
        text: `Seguro que quieres cambiar la página a la que se accede?`,
        button: `Si`,
        confirm: () => {  
      
          apifetch(
            'campus/payments/update',
            {
              method: 'POST',
              body: {
                id: props.pay.id,
                post_id: postid
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

    setPostidchanged(props.field.value != postid)

  }, [postid])


  useEffect(() => {

    setPostid(props.field.value)

  }, [])

  return <div className="Edit Post">{
      props.canedit ?
      editing ?
      <>      
        {
          postidchanged ?
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
        <SelectControl 
          value={ postid }
          options={ props.state.campuspagestree }
          onChange={
            value => setPostid(value)
          }
        />
      </>
      :
      <>
        <Button
          icon="edit"
          onClick={ () => setEditing(true) }
        />
        { 
          postid 
          && 
          <span className="PostTitle">{ 
            props.state.campuspagesbyid[postid] ?
            `[${ postid }] ${ props.state.campuspagesbyid[postid].title }`
            :
            'selecciona página'
          }</span> 
        }
      </>
      :
      <>
        { 
          postid 
          && 
          <span className="PostTitle">{ 
            props.state.campuspagesbyid[postid] ?
            `[${ postid }] ${ props.state.campuspagesbyid[postid].title }`
            :
            'sin asignar'
          }</span> 
        }
      </>
    }
  </div>
}
