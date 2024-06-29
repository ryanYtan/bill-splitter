import React, { useState } from 'react'
import { Person } from '../types/Person'
import { Item } from '../types/Item'
import {
  Box,
  Button,
  Chip,
  Dialog,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  Stack,
  TextField,
  Typography
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete'
import FaceIcon from "@mui/icons-material/Face";

export interface ItemizedBillProps {
  allPeople: Person[]
  items: Item[]
  setItems: React.Dispatch<React.SetStateAction<Item[]>>
}

const ItemizedBill = (props: ItemizedBillProps) => {
  const [openAddItem, setOpenAddItem] = useState(false)
  const [openAddPerson, setOpenAddPerson] = useState(false)

  const [selectedItemIndex, setSelectedItemIndex] = useState<number | null>(null)

  //form values
  const [itemName, setItemName] = useState('')
  const [itemPrice, setItemPrice] = useState('0')
  const [itemQuantity, setItemQuantity] = useState('1')
  const [itemNameError, setItemNameError] = useState('')
  const [itemPriceError, setItemPriceError] = useState('')
  const [itemQuantityError, setItemQuantityError] = useState('')


  const { allPeople, items, setItems } = props

  const handleDeleteItem = (itemName: string) => {
    setItems(items.filter((item) => item.title !== itemName))
  }

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
    setItems(prev => [...prev, { title: name, price, quantity, contributed: [] }])
    setItemName('')
    setItemPrice('0')
    setItemQuantity('1')
    setOpenAddItem(false)
  }

  return (
    <List sx={{ paddingBottom: 0 }}>
      {items.map((item, index) => (
        <>
          <ListItem
            secondaryAction={
              <IconButton edge='end' onClick={() => handleDeleteItem(itemName)}>
                <DeleteIcon />
              </IconButton>
            }
          >
            <Grid container>
              <Grid item xs={6}>
                <Box display='flex' flexDirection='column'>
                  <Typography variant='body1' fontSize={20} fontWeight='bold'>
                    {item.title}
                  </Typography>
                  <Typography variant='button'>
                    ${item.price.toFixed(2)}
                  </Typography>
                  <Typography variant='body1' fontSize={12}>
                    QTY: {item.quantity}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box border='1px dashed' height='100%' borderRadius={1} display='flex' justifyContent='center' alignItems='center'>
                  <IconButton onClick={() => {
                    setSelectedItemIndex(index)
                    setOpenAddPerson(true)
                  }}>
                    <AddIcon />
                  </IconButton>
                </Box>
              </Grid>
            </Grid>
          </ListItem>
          <Divider />
        </>
      ))}
      {selectedItemIndex}
      {' '}
      {JSON.stringify(items)}
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
      <Dialog open={openAddPerson} onClose={() => setOpenAddPerson(false)} fullWidth>
        <Box px={2} py={2}>
          <Stack spacing={1}>
            <Box textAlign='center'>
              <Typography variant='h2' fontSize={28}>
                Add Contributions
              </Typography>
            </Box>
            <Divider />
            <Box display='flex' justifyContent='center' flexDirection='column' textAlign='center'>
              <Typography variant='body1' fontSize={24} fontWeight='bold'>
                {selectedItemIndex && items[selectedItemIndex]?.title}
              </Typography>
              <Box display='flex' gap={1} justifyContent='center' textAlign='center'>
                <Typography variant='button' fontSize={16}>
                  $ {selectedItemIndex && items[selectedItemIndex].price.toFixed(2)}
                </Typography>
                <Typography variant='button' fontSize={16}>
                  (QTY: {selectedItemIndex && items[selectedItemIndex].quantity})
                </Typography>
              </Box>
            </Box>
            <Divider />
            <Box>
              {allPeople.map((person) => (
                <Chip
                  key={person.name}
                  label={person.name}
                  icon={<FaceIcon />}
                  color={selectedItemIndex && items[selectedItemIndex]?.contributed.some(p => p.name === person.name) ? 'primary' : 'default'}
                  onClick={() => {

                  }}
                  sx={{ m: 0.5 }}
                />
                ))}
            </Box>
          </Stack>
        </Box>
      </Dialog>
    </List>
  )
}

export default ItemizedBill
