export const pagesTree = (
  items, 
  parent = 0, 
  level = 0, 
  result = []
) => {
  items
    .filter(item => item.parent === parent)
    .forEach(item => {
      result.push({
        value: item.id,
        label: `${"— ".repeat(level)}${item.title}`
      });

      pagesTree(items, item.id, level + 1, result);
    });

  return result;
}

export const validateMail = email => {

  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return regex.test(email)
}

export const showMessage = (dispatch, text, mode) => {  

  dispatch({
    messages: {
      open: true,
      text: text,
      mode: mode
    }
  })

  setTimeout(() => {

    dispatch({
      messages: {
        open: false
      }
    })

  }, 2000)
}