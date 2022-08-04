import React, {useRef} from 'react'
import {useSetPostContext} from '../hooks/useGetPosts'
import {generatePost} from '../api-calls/posts'

export const Form = () => {
  const titleRef = useRef<HTMLInputElement>(null)
  const bodyRef = useRef<HTMLTextAreaElement>(null)
  const dispatch = useSetPostContext()

  const handleSubmit = (event: any) => {
    event.preventDefault()
    const title = titleRef.current!.value
    const body = bodyRef.current!.value
    generatePost({title, body}).then(data => dispatch(data))
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="form">
        <label className="form-label">
          <span className="title">Title:</span>
          <input
            type="text"
            placeholder="Title post"
            className="title-input"
            ref={titleRef}
          />
        </label>
        <label className="form-label">
          <span className="title">Message:</span>
          <textarea
            rows={4}
            cols={50}
            placeholder="Message post"
            className="message-input"
            ref={bodyRef}
          />
        </label>
        <button type="submit">Add Post</button>
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
function PostsDispatchContext(PostsDispatchContext: any) {
  throw new Error('Function not implemented.')
}
