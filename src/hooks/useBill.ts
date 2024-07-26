import {useState} from "react";

export interface User {
  id: number
  name: string
}

export interface Item {
  id: number
  title: string
  price: number
  quantity: number
}

export interface UserItem {
  user: User
  item: Item
}

export interface Tax {
  id: number
  title: string
  percentage: number
  isApplied: boolean
}

export interface BillResult {
  payer: User
  payee: User
  amount: number
}

export interface Bill {
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

  taxes: Tax[]
  addTax: (title: string, percentage: number) => void
  deleteTax: (tax: Tax) => void
  setTax: (tax: Tax) => void
  getTaxMultiplier: () => number

  computeGstPrice: () => number
  computeSubTotalPrice: () => number
  computeTotalPrice: () => number

  isReadyToComputeBill: () => boolean

  whoOwesWho: () => BillResult[]
}

const useBill = (): Bill => {
  const [id, setId] = useState(0)
  const [users, setUsers] = useState<User[]>([])
  const [items, setItems] = useState<Item[]>([])
  const [userItems, setUserItems] = useState<UserItem[]>([]) //modelling many-to-many
  const [whoPaid, setWhoPaid] = useState<User | null>(null) //who paid for the bill
  const [taxes, setTaxes] = useState<Tax[]>([
    { id: 0, title: 'Service Charge', percentage: 10, isApplied: true },
    { id: 1, title: 'GST', percentage: 9, isApplied: true },
  ])

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
    const newItems = items.filter((i) => i.id !== item.id)
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

  const addTax = (title: string, percentage: number) => {
    setTaxes([...taxes, { id: id, title: title, percentage: percentage, isApplied: true }]);
    setId(id + 1)
  }

  const deleteTax = (tax: Tax) => {
    const newTaxes = taxes.filter((t) => t.id !== tax.id)
    setTaxes(newTaxes)
  }

  const setTax = (tax: Tax) => {
    const newTaxes = taxes.map((t) => t.id === tax.id ? tax : t)
    setTaxes(newTaxes)
  }

  const getTaxMultiplier = () => {
    const percentage = taxes
      .filter((tax) => tax.isApplied)
      .map((tax) => 1 + (tax.percentage / 100)) //nice arithmetic error :^)
      .reduce((acc, tax) => acc * tax, 1)
    return percentage
  }

  const computeSubTotalPrice = () => {
    return items.reduce((acc, item) => acc + item.price * item.quantity, 0)
  }

  const computeGstPrice = () => {
    const taxMultiplier = taxes
      .filter((tax) => tax.isApplied)
      .filter((tax) => tax.id !== 1)
      .map((tax) => 1 + (tax.percentage / 100)) //nice arithmetic error :^)
      .reduce((acc, tax) => acc * tax, 1)
    return (computeSubTotalPrice() * taxMultiplier) * (taxes.find((tax) => tax.id === 1)?.percentage || 0) / 100
  }

  const computeTotalPrice = () => {
    const totalPriceBeforeTax = computeSubTotalPrice()
    const taxMultiplier = getTaxMultiplier()
    return totalPriceBeforeTax * taxMultiplier
  }

  const isReadyToComputeBill = () => {
    return users.length > 0 && items.length > 0 && whoPaid !== null
  }

  const whoOwesWho = (): BillResult[] => {
    let results: BillResult[] = users.map(u => ({ payer: u, payee: whoPaid!, amount: 0 }))

    //compute the total amount paid by each user
    for (const userItem of userItems) {
      const user = userItem.user
      const item = userItem.item
      const pricePaidByUser = item.price * item.quantity / getUsersForItem(item).length
      results = results.map(result => {
        if (result.payer.id === user.id) {
          return { ...result, amount: result.amount + pricePaidByUser }
        } else {
          return result
        }
      })
    }

    return results
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
    selectWhoPaid,
    taxes,
    addTax,
    deleteTax,
    setTax,
    getTaxMultiplier,
    computeGstPrice,
    computeSubTotalPrice,
    computeTotalPrice,
    isReadyToComputeBill,
    whoOwesWho,
  }
}

export default useBill
