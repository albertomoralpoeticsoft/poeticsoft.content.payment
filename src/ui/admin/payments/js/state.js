import immutableUpdate from 'immutable-update';

export const reducer = (state, action) => {

  return immutableUpdate(
    state,
    action
  )
}

export const initState = {
  pays: []
}