import React, {useRef} from 'react'
import {useSetPostContext} from '../hooks/useGetPosts'
import {generatePost} from '../api-calls/posts'
import {toast} from 'react-toastify'

export const Form = () => {
  const titleRef = useRef<HTMLInputElement>(null)
  const bodyRef = useRef<HTMLTextAreaElement>(null)
  const dispatch = useSetPostContext()

  const handleSubmit = (event: any) => {
    event.preventDefault()
    const title = titleRef.current!.value
    const body = bodyRef.current!.value
    generatePost({title, body}).then(({posts, addedItem}) => {
      dispatch({posts})
      toast.success(`Post created:  ${addedItem.title}`)
      titleRef.current!.value = ''
      bodyRef.current!.value = ''
    })
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="form">
        <label className="form-label">
          <span className="title">Title:</span>
          <input
            type="text"
            placeholder="Title reminder"
            className="title-input"
            ref={titleRef}
          />
        </label>
        <label className="form-label">
          <span className="title">Message:</span>
          <textarea
            rows={4}
            cols={50}
            placeholder="Message reminder"
            className="message-input"
            ref={bodyRef}
          />
        </label>
        <button type="submit">Add Reminder</button>
      </form>
      <style jsx>{`
        .form {
          display: grid;
          justify-content: center;
          gap: 10px;
        }

        .title {
          font-size: 1.2rem;
          font-weight: bold;
          margin-bottom: 5px;
        }

        .form-label {
          display: grid;
        }
      `}</style>
    </div>
  )
}
