import {useState} from "react";

export type User = {
  id: number
  name: string
}

export type Item = {
  id: number
  title: string
  price: number
  quantity: number
}

export type UserItem = {
  user: User
  item: Item
}

export interface UseBillObject {
  users: User[]
  addUser: (name: string) => void
  deleteUser: (user: User) => void
  hasUser: (name: string) => boolean
  items: Item[]
  addItem: (title: string, price: number, quantity: number) => void
  deleteItem: (item: Item) => void
  userHasItem: (user: User, item: Item) => boolean
  getUsersForItem: (item: Item) => User[]
  addUserToItem: (user: User, item: Item) => void
  removeUserFromItem: (user: User, item: Item) => void
  whoPaid: User | null
  selectWhoPaid: (user: User) => void
}

const useBill = (): UseBillObject => {
  const [id, setId] = useState(0)
  const [users, setUsers] = useState<User[]>([])
  const [items, setItems] = useState<Item[]>([])
  const [userItems, setUserItems] = useState<UserItem[]>([]) //modelling many-to-many
  const [whoPaid, setWhoPaid] = useState<User | null>(null) //who paid for the bill

  const addUser = (name: string) => {
    setUsers([...users, { id: id, name: name }]);
    setId(id + 1)
  }

  const deleteUser = (user: User) => {
    const newUsers = users.filter((u) => u.id !== user.id)
    const newUserItems = userItems.filter((userItem) => userItem.user.id !== user.id)
    setUsers(newUsers)
    setUserItems(newUserItems)
    if (whoPaid && whoPaid.id === user.id) {
      setWhoPaid(null)
    }
  }

  const hasUser = (name: string) => {
    return users.find((user) => user.name === name) !== undefined
  }

  const addItem = (title: string, price: number, quantity: number) => {
    setItems([...items, { id: id, title: title, price: price, quantity: quantity }]);
    setId(id + 1)
  }

  const deleteItem = (item: Item) => {
    const newItems = items.filter((item) => item.id !== item.id)
    const newUserItems = userItems.filter((userItem) => userItem.item.id !== item.id)
    setItems(newItems)
    setUserItems(newUserItems)
  }

  const userHasItem = (user: User, item: Item) => {
    return userItems.find((userItem) => userItem.user.id === user.id && userItem.item.id === item.id) !== undefined
  }

  const getUsersForItem = (item: Item) => {
    return userItems.filter((userItem) => userItem.item.id === item.id).map((userItem) => userItem.user)
  }

  const addUserToItem = (user: User, item: Item) => {
    setUserItems([...userItems, { user, item }])
  }

  const removeUserFromItem = (user: User, item: Item) => {
    const newUserItems = userItems.filter((userItem) => userItem.user.id !== user.id || userItem.item.id !== item.id)
    setUserItems(newUserItems)
  }

  const selectWhoPaid = (user: User) => {
    setWhoPaid(user)
  }

  return {
    users,
    addUser,
    deleteUser,
    hasUser,
    items,
    addItem,
    deleteItem,
    userHasItem,
    getUsersForItem,
    addUserToItem,
    removeUserFromItem,
    whoPaid,
    selectWhoPaid
  }
}

export default useBill