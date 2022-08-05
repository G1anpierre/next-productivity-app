import type {NextPage} from 'next'
import {useGetTodos} from '../hooks/useGetTodos'
import {List} from '../components/List'
import {Search} from '../components/Search'
import {Form} from '../components/Form'
import {usePostsContext} from '../hooks/useGetPosts'
import {useQuery} from '@tanstack/react-query'
import {getTodos} from '../api-calls/todos'
import {AddTodoForm} from '../components/AddTodoForm'

const Home: NextPage = () => {
  // const {filteredTodos, setQuery, query} = useGetTodos()
  const postQuery = useQuery(['todos'], getTodos)
  const {posts} = usePostsContext()

  return (
    <>
      <div className="wrapper">
        <div className="container">
          <div className="todos">
            <h2>Todos {postQuery.isFetching ? <small>...</small> : null}</h2>
            {/* <Search onSearchQuery={setQuery} query={query} /> */}
            <AddTodoForm />
            {postQuery.isLoading ? (
              <div>Loading...</div>
            ) : (
              <List list={postQuery.data.todos} listoption="todos" />
            )}
          </div>
          <div className="reminders">
            <h2>Reminders</h2>
            <Form />
            <List list={posts} listoption="posts" />
          </div>
        </div>
      </div>
      <style jsx>
        {`
          .wrapper {
            padding: 16px;
            max-width: 1200px;
            margin: 0 auto;
          }

          .container {
            display: grid;
          }

          @media screen and (min-width: 768px) {
            .container {
              grid-template-columns: repeat(2, 1fr);
              grid-gap: 1rem;
            }
          }
        `}
      </style>
    </>
  )
}

export default Home
