import React, {FC} from 'react'
import type {ListType} from '../components/ListItem'
import {ListItem} from '../components/ListItem'

type ListProps = {
  list: ListType[]
  listoption: string
}

export const List: FC<ListProps> = ({list, listoption}) => {
  return (
    <>
      <ul>
        {list?.map(item => (
          <ListItem
            title={item.title}
            body={item.body}
            id={item.id}
            key={item.id}
            listoption={listoption}
          />
        ))}
      </ul>
    </>
  )
}
