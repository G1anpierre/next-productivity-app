import type {NextPage} from 'next'
import {useGetTodos} from '../hooks/useGetTodos'
import {List} from '../components/List'
import {useGetPosts} from '../hooks/useGetPosts'
import {Search} from '../components/Search'
import {Form} from '../components/Form'
import {usePostsContext} from '../hooks/useGetPosts'

const Home: NextPage = () => {
  const {filteredTodos, setQuery, query} = useGetTodos()
  const {posts} = usePostsContext()

  return (
    <>
      <header></header>
      <div className="container">
        <div className="left">
          <h2>Todos</h2>
          <Search onSearchQuery={setQuery} query={query} />
          <List list={filteredTodos} listoption="todos" />
        </div>
        <div className="right">
          <h2>Posts</h2>
          <Form />
          <List list={posts} listoption="posts" />
        </div>
      </div>
      <style jsx>
        {`
          .container {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
          }
        `}
      </style>
    </>
  )
}

export default Home
