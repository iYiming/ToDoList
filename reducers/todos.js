const todo = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        id: action.id,
        text: action.text,
        color: action.color,
        completed: false
      }
    case 'TOGGLE_TODO':
      if (state.id !== action.id) {
        return state
      }

      return Object.assign({}, state, {
        completed: !state.completed
      })
    default:
      return state
  }
}

const todos = (state = [], action) => {
  if (action.type === 'ADD_TODO') {
    return [
        todo(undefined, action),
        ...state,
      ]
  } else if (action.type === 'UPDATE_TODO'){
    var newArray = []     
     state.map(t => {
        if (t.id === action.id) {
          t.text = action.text
          t.color = action.color
        }
       
         newArray.push(t);  
      }
    )
    return newArray
  } else if (action.type === 'DELETE_TODO'){
    var newArray = []     
    state.map(
      t => {
      if (t.id !== action.id) {
        newArray.push(t);     
      }
    })
    return newArray
  } else {
      return state
  }
}

export default todos