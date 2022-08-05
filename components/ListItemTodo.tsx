import React, {FC, useRef, useState} from 'react'
import type {ListType} from './ListItem'
import {useMutation, useQueryClient} from '@tanstack/react-query'
import {
  updateTodoCompleteMutation,
  deleteTodoMutation,
} from '../api-calls/todos'

export const ListItemTodo: FC<ListType> = ({title, id = 1, completed}) => {
  const titleRef = useRef<HTMLInputElement>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [completeTodo, setCompleteTodo] = useState(completed)
  const queryClient = useQueryClient()
  const {mutate, status, isIdle, isLoading, isSuccess, reset} = useMutation(
    updateTodoCompleteMutation,
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['todos'])
      },
    },
  )
  const {mutate: mutateDeleteTodo} = useMutation(deleteTodoMutation, {
    onSuccess: () => {
      queryClient.invalidateQueries(['todos'])
    },
  })

  const handleEdit = () => {
    setIsEditing(!isEditing)
  }

  const handleDelete = () => {
    mutateDeleteTodo({id})
  }

  const handleComplete = () => {
    mutate(
      {
        id,
        completed: !completeTodo,
        title: title,
      },
      {
        onSuccess: () => {
          setCompleteTodo(!completeTodo)
        },
      },
    )
  }

  const handleSave = () => {
    mutate(
      {
        id,
        completed: completeTodo,
        title: titleRef.current?.value || title,
      },
      {
        onSuccess: () => {
          setIsEditing(false)
        },
      },
    )
  }

  return (
    <>
      <li className="list-item-todo">
        {isEditing ? (
          <div className="edit-todo">
            <input type="text" ref={titleRef} defaultValue={title} />
            <button onClick={handleSave}>save</button>
          </div>
        ) : (
          <h3>{title}</h3>
        )}
        <input
          type="checkbox"
          checked={completeTodo}
          onChange={handleComplete}
        />
        <button onClick={handleEdit}>edit</button>
        <button onClick={handleDelete}>delete</button>
      </li>
      <style jsx>{`
        .list-item-todo {
          display: grid;
          grid-auto-flow: column;
          grid-template-columns: 1fr repeat(3, auto);
          align-items: start;
          gap: 10px;
        }

        .edit-todo {
          display: grid;
          grid-auto-flow: column;
          grid-template-columns: 1fr auto;
          align-items: start;
          gap: 10px;
        }
        h3 {
          margin: 0;
        }
        button {
          margin: 0;
        }
      `}</style>
    </>
  )
}
