import React, {FC} from 'react'
import type {ListType} from '../components/ListItem'
import {ListItem} from '../components/ListItem'
import {ListItemTodo} from '../components/ListItemTodo'

type ListProps = {
  list: ListType[]
  listoption: string
}

export const List: FC<ListProps> = ({list, listoption}) => {
  switch (listoption) {
    case 'posts':
      return (
        <>
          <ul className="list">
            {list.map(item => (
              <ListItem {...item} listoption={listoption} key={item.id} />
            ))}
          </ul>
          <style jsx>{`
            .list {
              list-style: none;
              padding: 0;
            }
          `}</style>
        </>
      )
    case 'todos':
      return (
        <>
          <ul className="list">
            {list.map(item => (
              <ListItemTodo {...item} listoption={listoption} key={item.id} />
            ))}
          </ul>
          <style jsx>{`
            .list {
              display: grid;
              gap: 20px;
              list-style: none;
              padding: 0;
            }
          `}</style>
        </>
      )
    default:
      return null
  }
}
