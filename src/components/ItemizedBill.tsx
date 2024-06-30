import React, { useState } from 'react'
import {
  Box,
  Button,
  Dialog,
  Divider,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  Stack,
  TextField,
  Typography
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import BillItem from './BillItem'
import {Item, User} from "../hooks/useBill";

export interface ItemizedBillProps {
  users: User[]
  items: Item[]
  addItem: (title: string, price: number, quantity: number) => void
  deleteItem: (item: Item) => void
  getUsersForItem: (item: Item) => User[]
  addUserToItem: (user: User, item: Item) => void
  removeUserFromItem: (user: User, item: Item) => void
}

const ItemizedBill = (props: ItemizedBillProps) => {
  const { users, items, addItem, deleteItem, addUserToItem, getUsersForItem, removeUserFromItem } = props

  const [openAddItem, setOpenAddItem] = useState(false)

  //form values
  const [itemName, setItemName] = useState('')
  const [itemPrice, setItemPrice] = useState('0')
  const [itemQuantity, setItemQuantity] = useState('1')
  const [itemNameError, setItemNameError] = useState('')
  const [itemPriceError, setItemPriceError] = useState('')
  const [itemQuantityError, setItemQuantityError] = useState('')

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault()
    let error = false

    if (!itemName) {
      error = true
      setItemNameError('Item name is required')
    } else if (items.find((item) => item.title === itemName)) {
      error = true
      setItemNameError('Item already exists')
    }
    const name = itemName

    if (!itemPrice) {
      error = true
      setItemPriceError('Item price is required')
    } else if (itemPrice.includes('e') || isNaN(Number(itemPrice))) {
      error = true
      setItemPriceError('Item price must be a number')
    } else if (Number(itemPrice) <= 0) {
      error = true
      setItemPriceError('Item price must be greater than 0')
    }
    const price = Number(itemPrice)

    if (!itemQuantity) {
      error = true
      setItemQuantityError('Item quantity is required')
    } else if (itemQuantity.includes('e') || itemQuantity.includes('.') || isNaN(Number(itemQuantity))) {
      error = true
      setItemQuantityError('Item quantity must be a number')
    } else if (Number(itemQuantity) <= 0) {
      error = true
      setItemQuantityError('Item quantity must be greater than 0')
    }
    const quantity = Number(itemQuantity)

    if (error) {
      return
    }
    addItem(name, price, quantity)
    setItemName('')
    setItemPrice('0')
    setItemQuantity('1')
    setOpenAddItem(false)
  }

  return (
    <List sx={{ paddingBottom: 0 }}>
      {items.map((item) => (
        <>
          <ListItem
            secondaryAction={
              <IconButton edge='end' onClick={() => deleteItem(item)}>
                <DeleteIcon />
              </IconButton>
            }
          >
            <BillItem item={item} users={users}  addUserToItem={addUserToItem} getUsersForItem={getUsersForItem} removeUserFromItem={removeUserFromItem} />
          </ListItem>
          <Divider />
        </>
      ))}
      <ListItem sx={{ textAlign: 'right' }}>
        <Typography variant='button'>
          <b>Total Bill:</b>{' '}${items.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)}
        </Typography>
      </ListItem>
      <Divider />
      <ListItem>
        <Button fullWidth onClick={() => setOpenAddItem(true)}>
          Add Item
        </Button>
      </ListItem>
      <Dialog open={openAddItem} onClose={() => setOpenAddItem(false)} fullWidth>
        <Box px={2} py={2}>
          <form onSubmit={handleSubmit}>
            <Stack spacing={2} textAlign='center'>
              <Typography variant='h2' fontSize={28}>
                Add an item
                <Divider />
              </Typography>
              <TextField
                fullWidth
                label='Name'
                name='itemName'
                size='small'
                value={itemName}
                error={!!itemNameError}
                onChange={(e) => setItemName(e.target.value)}
                helperText={itemNameError || ' '}
                placeholder='e.g. Chicken Rice'
                InputProps={{
                  autoComplete: 'off',
                }}
              />
              <TextField
                fullWidth
                label='Price'
                name='itemPrice'
                size='small'
                value={itemPrice}
                error={!!itemPriceError}
                onChange={(e) => setItemPrice(e.target.value)}
                helperText={itemPriceError || ' '}
                InputProps={{
                  autoComplete: 'off',
                  startAdornment: <InputAdornment position="start">$</InputAdornment>
                }}
              />
              <TextField
                fullWidth
                label='Quantity'
                name='itemQuantity'
                size='small'
                type='text'
                value={itemQuantity}
                error={!!itemQuantityError}
                onChange={(e) => setItemQuantity(e.target.value)}
                helperText={itemQuantityError || ' '}
                InputProps={{
                  autoComplete: 'off',
                }}
              />
              <Box display='flex' justifyContent='flex-end'>
                <Button variant='contained' type='submit'>
                  Add Item
                </Button>
              </Box>
            </Stack>
          </form>
        </Box>
      </Dialog>
    </List>
  )
}

export default ItemizedBill
