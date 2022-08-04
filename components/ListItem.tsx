import React, {FC} from 'react'
import {
  generatePut,
  generateDelete,
  useSetPostContext,
} from '../hooks/useGetPosts'

export type ListType = {
  useId?: number
  id?: number
  title: string
  completed?: boolean
  body?: string
  listoption?: string
}

export const ListItem: FC<ListType> = ({title, body, id = 1, listoption}) => {
  const [isEditable, setIsEditable] = React.useState(false)
  const [titleValue, setTitleValue] = React.useState(title || '')
  const [bodyValue, setBodyValue] = React.useState(body || '')
  const dispatch = useSetPostContext()

  const handleEditTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitleValue(event.target.value)
  }

  const handleEditBody = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBodyValue(event.target.value)
  }

  const handleOpenEdit = () => {
    setIsEditable(!isEditable)
  }

  const handleDelete = () => {
    generateDelete(id).then(data => dispatch(data))
  }

  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    generatePut({title: titleValue, body: bodyValue, id}).then(data =>
      dispatch(data),
    )
    setIsEditable(!isEditable)
  }

  const hasEditableButton = !!body && !isEditable
  const isPostsList = listoption === 'posts'

  return (
    <>
      <li className="list-item">
        {!isEditable ? (
          <h3>{title}</h3>
        ) : (
          <input
            type="text"
            value={titleValue}
            onChange={handleEditTitle}
            className="input"
          />
        )}
        {!isEditable ? (
          <p>{body}</p>
        ) : (
          <textarea
            value={bodyValue}
            onChange={handleEditBody}
            className="input"
          />
        )}
        {hasEditableButton ? (
          <div className="editable-buttons">
            <button onClick={handleOpenEdit}>edit</button>
            <button onClick={handleDelete}>delete</button>
          </div>
        ) : isPostsList ? (
          <button onClick={handleSubmit}>Submit</button>
        ) : null}
      </li>
      <style jsx>{`
        .list-item {
          display: grid;
          gap: 10px;
          margin-bottom: 20px;
        }
        .input {
          display: block;
        }

        .editable-buttons {
          display: grid;
          gap: 10px;
          grid-auto-flow: column;
        }

        h3,
        p {
          margin: 0;
        }
      `}</style>
    </>
  )
}
