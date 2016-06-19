let nextTodoId = 0
export const addTodo = (text,color) => {
  return {
    type: 'ADD_TODO',
    id: nextTodoId++,
    text,
    color
  }
}

export const deleteTodo = (id) => {
  return {
    type: 'DELETE_TODO',
    id
  }
}

export const updateTodo = (id,text,color,complete) => {
  return {
    type: 'UPDATE_TODO',
    id,
    text,
    color,
    complete
  }
}