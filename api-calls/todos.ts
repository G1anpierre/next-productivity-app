const getTodos = async () => {
  const response = await fetch('/api/todos')
  const data = await response.json()
  return data
}

const addTodoMutation = async (value: {title: string; completed: Boolean}) => {
  const response = await fetch('/api/todos', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(value),
  })
  const data = await response.json()
  return data
}

const updateTodoCompleteMutation = async (value: {
  id: number
  completed: Boolean | undefined
  title: string
}) => {
  const response = await fetch(`/api/todos?id=${value.id}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({completed: value.completed, title: value.title}),
  })
  const data = await response.json()
  return data
}

const deleteTodoMutation = async (value: {id: number}) => {
  const response = await fetch(`/api/todos?id=${value.id}`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
  const data = await response.json()
  return data
}

export {
  getTodos,
  addTodoMutation,
  updateTodoCompleteMutation,
  deleteTodoMutation,
}
