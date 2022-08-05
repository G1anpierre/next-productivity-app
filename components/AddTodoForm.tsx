import React, {useRef} from 'react'
import {useMutation, useQueryClient} from '@tanstack/react-query'
import {addTodoMutation} from '../api-calls/todos'

export const AddTodoForm = () => {
  const queryClient = useQueryClient()
  const inputRef = useRef<HTMLInputElement>(null)
  const {mutate, isIdle, isLoading, isSuccess, reset} = useMutation(
    addTodoMutation,
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['todos'])
      },
    },
  )

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault()
    mutate(
      {
        title: inputRef.current!.value,
        completed: false,
      },
      {
        onSuccess: () => {
          inputRef.current!.value = ''
        },
      },
    )
  }

  return (
    <>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Add a todo"
            ref={inputRef}
            onFocus={reset}
          />
          <button>
            {isIdle
              ? 'Add'
              : isLoading
              ? 'loading'
              : isSuccess
              ? 'Succesfully Added!'
              : ''}
          </button>
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
