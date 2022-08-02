import type {NextPage} from 'next'
import {useGetTodos} from '../hooks/useGetTodos'
import {List} from '../components/List'
import {useGetPosts} from '../hooks/useGetPosts'
import {Search} from '../components/Search'

const Home: NextPage = () => {
  const {filteredTodos, setQuery, query} = useGetTodos()
  const [posts] = useGetPosts()

  return (
    <>
      <header>
        <Search onSearchQuery={setQuery} query={query} />
      </header>
      <div className="container">
        <div className="left">
          <h2>Todos</h2>
          <List list={filteredTodos} />
        </div>
        <div className="right">
          <h2>Posts</h2>
          <List list={posts} />
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
