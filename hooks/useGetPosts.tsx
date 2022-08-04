import React, {
  createContext,
  Dispatch,
  useContext,
  useEffect,
  useState,
} from 'react'

type Post = {
  title: string
  body: string
  id: number
}

type Posts = {
  posts: Post[]
}

const PostsStoreContext = createContext(null as any)
const PostsDispatchContext = createContext((() => {}) as Dispatch<any>)

export const useGetPosts = () => {
  const [posts, setPosts] = useState<Posts>({posts: []})

  const getPosts = async () => {
    const response = await fetch('/api/posts')
    const data = await response.json()
    setPosts(data)
  }

  useEffect(() => {
    getPosts()
  }, [])

  return {posts, setPosts}
}

// API call to get posts
export const generatePost = async (value: {title: string; body: string}) => {
  const response = await fetch('/api/posts', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(value),
  })
  const data = await response.json()
  console.log('data generated :', data)
  return data
}

export const generatePut = async (value: {
  title: string
  body: string
  id: number
}) => {
  const response = await fetch(`/api/posts?id=${value.id}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(value),
  })
  const data = await response.json()
  return data
}

export const generateDelete = async (id: number) => {
  const response = await fetch(`/api/posts?id=${id}`, {
    method: 'DELETE',
  })
  const data = await response.json()
  return data
}

// Context to use
export const usePostsContext = () => {
  const posts = useContext(PostsStoreContext)
  if (!posts) {
    throw new Error('usePostsContext must be used within a PostsProvider')
  }
  return posts
}

export const useSetPostContext = () => {
  const dispatch = useContext(PostsDispatchContext)
  if (!dispatch) {
    throw new Error('useSetPostContext must be used within a PostsProvider')
  }
  return dispatch
}

type contextProps = {
  children: React.ReactNode
}

export const Context: React.FC<contextProps> = ({children}) => {
  // const [state, setState] = useState([]);
  const {posts, setPosts} = useGetPosts()

  return (
    <PostsStoreContext.Provider value={posts}>
      <PostsDispatchContext.Provider value={setPosts}>
        {children}
      </PostsDispatchContext.Provider>
    </PostsStoreContext.Provider>
  )
}
