import React from 'react'
import {useMutation, useQueryClient, QueryCache} from '@tanstack/react-query'
import {addTodoMutation} from '../api-calls/todos'

export const AddTodoForm = () => {
  const queryClient = useQueryClient()
  const {mutateAsync, status, data} = useMutation(addTodoMutation, {
    onSuccess: () => {
      queryClient.invalidateQueries(['todos'])
    },
  })

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault()
    mutateAsync({
      title: 'New Todo',
      completed: false,
    })
  }

  return (
    <>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Add a todo" />
          <button>Add</button>
        </form>
      </div>
      <style jsx>{`
        .container {
          display: flex;
          justify-content: center;
        }
      `}</style>
    </>
  )
}
