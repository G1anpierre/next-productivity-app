import React, {Dispatch, FC, SetStateAction, useRef, useState} from 'react'

type SearchProps = {
  onSearchQuery: Dispatch<SetStateAction<string>>
  query: string
}

export const Search: FC<SearchProps> = ({onSearchQuery, query}) => {
  const [searchText, setSearchText] = useState(query)

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault()
    onSearchQuery(searchText)
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value)
  }

  return (
    <>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <input type="text" onChange={handleChange} value={searchText} />
          <button>Search</button>
        </form>
      </div>
      <style jsx>{`
        .container {
          display: flex;
          justify-content: center;
        }
      `}</style>
    </>
  )
}
