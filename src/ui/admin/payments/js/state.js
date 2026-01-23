import immutableUpdate from 'immutable-update';

export const reducer = (state, action) => {

  return immutableUpdate(
    state,
    action
  )
}

export const initState = {
  pays: [],
  campuspages: [],
  campuspagesbyid: {},
  campuspagestree: [],
  tableFields: [
    'user_mail',
    'post_id'
  ],
  tableFieldTitles: {
    user_mail: 'Email',
    post_id: 'Page Id'
  },
  modal: {
    open: false,
    title: 'Modal',
    button: 'Confirm',
    confirm: () => {

      console.log('confirm')
    }
  },
  newpay: {
    email: 'email',
    postid: null
  }
}