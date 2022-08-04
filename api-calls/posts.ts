// API call to get posts

const generatePost = async (value: {title: string; body: string}) => {
  const response = await fetch('/api/posts', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(value),
  })

  const data = await response.json()
  return data
}

const generatePut = async (value: {
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

const generateDelete = async (id: number) => {
  const response = await fetch(`/api/posts?id=${id}`, {
    method: 'DELETE',
  })
  const data = await response.json()
  return data
}

export {generatePost, generatePut, generateDelete}
