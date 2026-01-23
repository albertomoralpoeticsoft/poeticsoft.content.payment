const {
  __experimentalInputControl: InputControl
} = wp.components

export default props => {

  return <InputControl
    value={ props.state.newpay.email }
    onChange={ 
      value => props.dispatch({
        newpay: {
          email: value
        }
      })
    }
  />
};