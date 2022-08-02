import {useEffect, useMemo, useState} from 'react'
import {ListType} from '../components/ListItem'

const filterSearch = (todos: ListType[], query: string) => {
  return todos.filter(todo => todo.title.includes(query))
}

export const useGetTodos = () => {
  const initialState = () => {
    return (
      (typeof window !== 'undefined' &&
        JSON.parse(window.localStorage.getItem('query') as string)) ||
      ''
    )
  }

  const [todos, setTodos] = useState([])
  const [query, setQuery] = useState(initialState)

  const filteredTodos = useMemo(
    () => filterSearch(todos, query),
    [query, todos],
  )

  useEffect(() => {
    const getTodos = async () => {
      const response = await fetch('https://jsonplaceholder.typicode.com/todos')
      const data = await response.json()
      setTodos(data)
    }

    getTodos()
  }, [])

  useEffect(() => {
    window.localStorage.setItem('todos', JSON.stringify(filteredTodos))
    window.localStorage.setItem('query', JSON.stringify(query))
  }, [query, filteredTodos])

  return {filteredTodos, setQuery, query}
}
