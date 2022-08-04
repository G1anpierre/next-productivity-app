// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import nextConnect from 'next-connect'

const posts = [
  {
    id: 1,
    title: 'Post 1',
    body: 'Bacon ipsum dolor amet ground round pig sirloin corned beef andouille t-bone. Ham hock chislic ham biltong cow turkey capicola ground round. Frankfurter kielbasa pig andouille burgdoggen capicola. Porchetta pig shoulder ball tip.',
  },
  {
    id: 2,
    title: 'Post 2',
    body: 'Venison drumstick tongue, doner pig jerky ribeye jowl pork loin chislic burgdoggen turducken pork belly. Sirloin bacon pork belly, short loin kevin tri-tip picanha ham chislic fatback meatball pancetta bresaola biltong ham hock.',
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
    res.json({posts})
  })
  .post((req, res) => {
    const {title, body} = req.body
    const addedItem = {id: Date.now(), title, body}
    posts.push(addedItem)
    res.json({posts, addedItem})
  })
  .put((req, res) => {
    const {title, body} = req.body
    const {id} = req.query
    const index = posts.findIndex(post => post.id === Number(id))
    const updatedItem = {id: Number(id), title, body}
    posts.splice(index, 1, updatedItem)
    res.json({posts, updatedItem})
  })
  .delete((req, res) => {
    const {id} = req.query
    const index = posts.findIndex(post => post.id === Number(id))
    const deletedItem = posts.find(post => post.id === Number(id))
    posts.splice(index, 1)
    res.json({posts, deletedItem})
  })

export default handler
