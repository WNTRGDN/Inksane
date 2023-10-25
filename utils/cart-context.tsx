import { ISessionLineItem } from 'WNTR/interfaces'
import React from 'react'

const ShoppingCart = React.createContext({
  items: [] as Array<ISessionLineItem>,
  add: (item: ISessionLineItem) => {},
  remove: (item: ISessionLineItem) => {},
  clear: () => {}
})

export default ShoppingCart