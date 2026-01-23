const {
  Button
} = wp.components

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
  
  return <div className="Pays">
    {
      props.state.pays.length ?
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
              >
                Eliminar
              </Button>
            </div>])        
          }
        </div>
      )
      :
      <></>
    }
  </div>
}