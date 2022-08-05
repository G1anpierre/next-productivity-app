import nextConnect from 'next-connect'

const todos = [
  {
    userId: 1,
    id: 1,
    title: 'delectus aut autem',
    completed: false,
  },
  {
    userId: 1,
    id: 2,
    title: 'quis ut nam facilis et officia qui',
    completed: true,
  },
  {
    userId: 2,
    id: 3,
    title: 'fugiat veniam minus',
    completed: false,
  },
]

const handler = nextConnect({
  onError: (err, req, res, next) => {
    console.error(err.stack)
    res.status(500).end('Something broke!')
  },
  onNoMatch: (req, res) => {
    res.status(404).end('Page is not found')
  },
})
  .get((req, res) => {
    res.json({todos})
  })
  .post((req, res) => {
    const {title, completed} = req.body
    const addedItem = {
      userId: Math.floor(Math.random() * 5) + 1,
      id: Date.now(),
      title,
      completed,
    }
    todos.push(addedItem)
    res.json({todos, addedItem})
  })
  .put((req, res) => {
    const {title, completed} = req.body
    const {id} = req.query
    const index = todos.findIndex(todo => todo.id === Number(id))
    const updatedItem = {
      ...todos[index],
      title,
      completed,
    }
    todos.splice(index, 1, updatedItem)
    res.json({todos, updatedItem})
  })
  .delete((req, res) => {
    const {id} = req.query
    const index = todos.findIndex(todo => todo.id === Number(id))
    const deletedItem = todos.find(todo => todo.id === Number(id))
    todos.splice(index, 1)
    res.json({todos, deletedItem})
  })

export default handler
