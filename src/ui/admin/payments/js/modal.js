const {
  Modal,
  Button
} = wp.components

export default props => {

  return <>
    {
      props.state.modal.open &&
      <Modal 
        title={ props.state.modal.title }
        onRequestClose={ 
          () => props.dispatch({
            modal: {
              open: false
            }
          }) 
        }
      >
        <Button 
          variant="secondary" 
          onClick={ props.state.modal.confirm }
        >
          { props.state.modal.button }
        </Button>
      </Modal>
    }
  </>
};