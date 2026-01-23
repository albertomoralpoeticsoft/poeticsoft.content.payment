const {
  SelectControl
} = wp.components

export default props => {

  return <SelectControl 
    value={ props.state.newpay.postid }
    options={ props.state.campuspagestree }
    onChange={
      value => props.dispatch({
        newpay: {
          postid: value
        }
      })
    }
  />
};