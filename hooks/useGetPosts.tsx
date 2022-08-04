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
  const {posts, setPosts} = useGetPosts()

  return (
    <PostsStoreContext.Provider value={posts}>
      <PostsDispatchContext.Provider value={setPosts}>
        {children}
      </PostsDispatchContext.Provider>
    </PostsStoreContext.Provider>
  )
}
