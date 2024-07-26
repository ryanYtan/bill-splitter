import React, { useEffect, useState } from 'react'
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
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import * as y from 'yup'
import { yupResolver } from "@hookform/resolvers/yup"
import { ERR_MSG_INTEGER_GE_0, ERR_MSG_NUMBER_GE_0, ERR_MSG_REQUIRED } from './helpers/form';

export interface ItemizedBillProps {
  bill: Bill
}

const ITEMIZED_BILL_SCHEMA = y.object({
  itemName: y
    .string()
    .default('')
    .required(ERR_MSG_REQUIRED),
  itemPrice: y
    .number()
    .default(0)
    .min(0.01, ERR_MSG_NUMBER_GE_0)
    .positive(ERR_MSG_NUMBER_GE_0)
    .typeError(ERR_MSG_NUMBER_GE_0)
    .required(ERR_MSG_REQUIRED),
  itemQuantity: y
    .number()
    .integer()
    .default(1)
    .min(1, ERR_MSG_INTEGER_GE_0)
    .positive(ERR_MSG_INTEGER_GE_0)
    .typeError(ERR_MSG_INTEGER_GE_0)
    .required(ERR_MSG_REQUIRED),
})
type ItemizedBillForm = y.InferType<typeof ITEMIZED_BILL_SCHEMA>

const ItemizedBill = (props: ItemizedBillProps) => {
  const { bill } = props
  const [openAddItem, setOpenAddItem] = useState(false)
  const [ isSubmitSuccess, setIsSubmitSuccess ] = useState(false)

  const {
    control,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm<ItemizedBillForm>({
    resolver: yupResolver(ITEMIZED_BILL_SCHEMA),
    defaultValues: ITEMIZED_BILL_SCHEMA.getDefault(),
  })

  const onSubmit: SubmitHandler<ItemizedBillForm> = (data) => {
    if (bill.items.find((item) => item.title === data.itemName)) {
      setError('itemName', { type: 'custom', message: 'Item already exists' })
      return
    }
    bill.addItem(data.itemName, data.itemPrice, data.itemQuantity)
    setOpenAddItem(false)
    setIsSubmitSuccess(true)
  }

  useEffect(() => {
    if (isSubmitSuccess) {
      reset()
      setIsSubmitSuccess(false)
    }
  }, [isSubmitSuccess])

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
      <ListItem>
        <Button fullWidth onClick={() => setOpenAddItem(true)}>
          Add Item
        </Button>
      </ListItem>
      <Divider />
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
      {bill.taxes.filter(t => t.isApplied && t.id === 0).map(tax => ( //this is awful but whatever
        <>
          <ListItem sx={{ display: 'flex', justifyContent: 'flex-end', gap: 0.5 }}>
            <Tooltip title={`${tax.percentage}% of the subtotal`}>
              <InfoOutlinedIcon sx={{ fontSize: 12 }}/>
            </Tooltip>
            <Typography variant='button'>
              <b>{tax.title}:</b>{' '}${(bill.computeSubTotalPrice() * (tax.percentage / 100)).toFixed(2)}
            </Typography>
          </ListItem>
          <Divider />
        </>
      ))}
      {bill.taxes.filter(t => t.isApplied && t.id === 1).map(tax => ( //this is awful but whatever
        <>
          <ListItem sx={{ display: 'flex', justifyContent: 'flex-end', gap: 0.5 }}>
            <Tooltip title={`${tax.percentage}% of the sum of Subtotal and Service Charge (if available)`}>
              <InfoOutlinedIcon sx={{ fontSize: 12 }}/>
            </Tooltip>
            <Typography variant='button'>
              <b>{tax.title}:</b>{' '}${(bill.computeGstPrice()).toFixed(2)}
            </Typography>
          </ListItem>
          <Divider />
        </>
      ))}
      <ListItem sx={{ display: 'flex', justifyContent: 'flex-end', gap: 0.5 }}>
        <Tooltip title='Total after taxes'>
          <InfoOutlinedIcon sx={{ fontSize: 12 }}/>
        </Tooltip>
        <Typography variant='button'>
          <b>Total:</b>{' '}${bill.computeTotalPrice().toFixed(2)}
        </Typography>
      </ListItem>
      <Dialog open={openAddItem} onClose={() => setOpenAddItem(false)} fullWidth>
        <Box px={2} py={2}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={2} textAlign='center'>
              <Typography variant='h2' fontSize={28}>
                Add an item
                <Divider />
              </Typography>
              <Controller
                name='itemName'
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label='Name'
                    size='small'
                    error={!!errors?.itemName}
                    helperText={errors?.itemName?.message || ''}
                    placeholder='e.g. Chicken Rice'
                    InputProps={{
                      autoComplete: 'off',
                    }}
                  />
                )}
              />
              <Controller
                name='itemPrice'
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label='Price'
                    size='small'
                    error={!!errors?.itemPrice}
                    helperText={errors?.itemPrice?.message || ''}
                    InputProps={{
                      autoComplete: 'off',
                      startAdornment: <InputAdornment position="start">$</InputAdornment>
                    }}
                  />
                )}
              />
              <Controller
                name='itemQuantity'
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label='Quantity'
                    size='small'
                    error={!!errors?.itemQuantity}
                    helperText={errors?.itemQuantity?.message || ''}
                    InputProps={{
                      autoComplete: 'off',
                    }}
                  />
                )}
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
