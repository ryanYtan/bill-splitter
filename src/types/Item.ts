import { Person } from "./Person"

export interface Item {
  title: string
  price: number
  quantity: number
  contributed: Person[]
}
