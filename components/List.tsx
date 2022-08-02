import React, {FC} from 'react'
import type {ListType} from '../components/ListItem'
import {ListItem} from '../components/ListItem'

type ListProps = {
  list: ListType[]
}

export const List: FC<ListProps> = ({list}) => {
  return (
    <>
      <ul>
        {list.map(item => (
          <ListItem title={item.title} key={item.id} />
        ))}
      </ul>
    </>
  )
}
