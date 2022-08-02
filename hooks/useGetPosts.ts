import React, {useEffect, useState} from 'react'

export const useGetPosts = () => {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    const getPosts = async () => {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts')
      const data = await response.json()
      setPosts(data)
    }

    getPosts()
  }, [])

  return [posts]
}
