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

export {getTodos, addTodoMutation}
