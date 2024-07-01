import React, { useState } from 'react'
import {
  Box,
  Button, Checkbox,
  Dialog,
  Divider,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  Stack,
  TextField, Tooltip,
  Typography
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import BillItem from './BillItem'
import {Bill} from "../hooks/useBill";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

export interface ItemizedBillProps {
  bill: Bill
}

const ItemizedBill = (props: ItemizedBillProps) => {
  const { bill } = props

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
    } else if (bill.items.find((item) => item.title === itemName)) {
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
    bill.addItem(name, price, quantity)
    setItemName('')
    setItemPrice('0')
    setItemQuantity('1')
    setOpenAddItem(false)
  }

  return (
    <List sx={{ paddingBottom: 0 }}>
      {bill.items.map((item) => (
        <>
          <ListItem
            secondaryAction={
              <IconButton edge='end' onClick={() => bill.deleteItem(item)}>
                <DeleteIcon />
              </IconButton>
            }
          >
            <BillItem bill={bill} item={item} />
          </ListItem>
          <Divider />
        </>
      ))}
      {bill.taxes && bill.taxes.map((tax, index) => (
        <>
          <ListItem
            secondaryAction={
              <Checkbox
                checked={tax.isApplied}
                onChange={() => bill.setTax({ ...tax, isApplied: !tax.isApplied })}
              />
            }
          >
            <Stack direction='row' spacing={1} alignItems='center'>
              <Typography variant='button'>
                Apply
              </Typography>
              <TextField
                value={tax.percentage}
                onChange={(e) => bill.setTax({ ...tax, percentage: Number(e.target.value) })}
                variant='standard'
                InputProps={{
                  endAdornment: <Typography variant='button'>%</Typography>
                }}
                sx={{
                  width: 40,
                }}
              />
              <Typography variant='button'>
                {tax.title}
              </Typography>
            </Stack>
          </ListItem>
          {index < bill.taxes.length - 1 && <Divider />}
        </>
      ))}
      <Divider />
      <ListItem sx={{ display: 'flex', justifyContent: 'flex-end', gap: 0.5 }}>
        <Tooltip title='Total before taxes'>
          <InfoOutlinedIcon sx={{ fontSize: 12 }}/>
        </Tooltip>
        <Typography variant='button'>
          <b>Subtotal:</b>{' '}${bill.computeSubTotalPrice().toFixed(2)}
        </Typography>
      </ListItem>
      <Divider />
      <ListItem sx={{ display: 'flex', justifyContent: 'flex-end', gap: 0.5 }}>
        <Tooltip title='Total after taxes'>
          <InfoOutlinedIcon sx={{ fontSize: 12 }}/>
        </Tooltip>
        <Typography variant='button'>
          <b>Total:</b>{' '}${bill.computeTotalPrice().toFixed(2)}
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
