export default props => {

  return <div 
    className={`
      Messages
      ${ props.state.messages.open ? 'Open' : '' }
      ${ props.state.messages.mode || '' }
    `}
  >
    <div 
      className="Text"
      dangerouslySetInnerHTML={{
        __html: props.state.messages.text
      }}
    />
  </div>
}