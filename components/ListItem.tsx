import React, {FC} from 'react'

export type ListType = {
  useId?: number
  id?: number
  title: string
  completed?: boolean
  body?: string
}

export const ListItem: FC<ListType> = ({title}) => {
  return <li>{title}</li>
}
