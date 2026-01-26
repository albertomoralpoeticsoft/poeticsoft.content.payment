import immutableUpdate from 'immutable-update';

export const reducer = (state, action) => {

  return immutableUpdate(
    state,
    action
  )
}

export const initState = {
  modal: {
    open: false,
    title: 'Modal',
    button: 'Confirm',
    confirm: () => {

      console.log('confirm')
    }
  }
}