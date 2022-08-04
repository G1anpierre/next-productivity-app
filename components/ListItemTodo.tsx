import React, {FC, useState} from 'react'
import type {ListType} from './ListItem'

export const ListItemTodo: FC<ListType> = ({title, id = 1, completed}) => {
  const [completeTodo, setCompleteTodo] = useState(completed)
  const handleEdit = () => {
    console.log('edit', id)
  }

  const handleDelete = () => {
    console.log('delete', id)
  }

  const handleComplete = () => {
    setCompleteTodo(!completeTodo)
  }

  return (
    <>
      <li className="list-item-todo">
        <h3>{title}</h3>
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
