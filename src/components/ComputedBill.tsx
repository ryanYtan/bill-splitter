import {Bill} from "../hooks/useBill";
import {Box, Grid, Stack, Typography} from "@mui/material";
import React from "react";

interface ComputedBillProps {
  bill: Bill
}

const ComputedBill = (props: ComputedBillProps) => {
  const { bill } = props

  //const lines: string[] = (() => {
  //  let ret: string[] = []

  //  //first check if there are users that are not assigned to any items
  //  const unassignedUsers = bill.users.filter(user => bill.items.every(item => !bill.userHasItem(user, item)))
  //  if (unassignedUsers.length > 0) {
  //    ret.push(`WARNING: Users with no items:`)
  //    for (const user of unassignedUsers) {
  //      ret.push(`- ${user.name}`)
  //    }
  //    ret.push('')
  //  }

  //  //then check if there are items that are not assigned to any users
  //  const unassignedItems = bill.items.filter(item => bill.getUsersForItem(item).length === 0)
  //  if (unassignedItems.length > 0) {
  //    ret.push(`WARNING: Items with no contributors:`)
  //    for (const item of unassignedItems) {
  //      ret.push(`- ${item.title}`)
  //    }
  //    ret.push('')
  //  }

  //  const whoOwesWho = bill.whoOwesWho()
  //  for (const result of whoOwesWho) {
  //    const owed = result.amount
  //    if (bill.whoPaid && result.payer.id === bill.whoPaid.id) {
  //      ret.push(`${result.payer.name} paid for everyone.`)
  //      ret.push(`Contributed $${owed.toFixed(2)}.`)
  //      ret.push(`($${(owed * bill.getTaxMultiplier()).toFixed(2)} after tax)`)
  //      ret.push('')
  //    } else {
  //      ret.push(`${result.payer.name} owes ${result.payee.name} $${result.amount.toFixed(2)}`)
  //      ret.push(`($${(owed * bill.getTaxMultiplier()).toFixed(2)} after tax)`)
  //      ret.push('')
  //    }
  //  }
  //})()

  const whoOwesWho = bill.whoOwesWho()

  return (
    <Stack p={2} spacing={1}>
      <Box textAlign='center'>
        <Typography variant='h3' fontSize={16}>
          Bill Summary
        </Typography>
      </Box>
      <Box>
        <Typography variant='body2'>
          <b>Total Contributors:</b> {bill.users.length}
        </Typography>
        <Typography variant='body2'>
          <b>Total Items:</b> {bill.items.length}
        </Typography>
        <Typography variant='body2'>
          <b>Paid By:</b> {bill.whoPaid?.name}
        </Typography>
      </Box>
      {whoOwesWho.map((v, index) => bill.whoPaid && v.payer.id === bill.whoPaid.id ? (
        <Typography variant='body2' gutterBottom={false}>
          {v.payer.name} paid for everyone
        </Typography>
      ) : (
        <Typography variant='body2' gutterBottom={false}>
          {v.payer.name} owes {v.payee.name}{' '}
          <b>${v.amount.toFixed(2)}</b>
          <br/>
          (<b>${(v.amount * bill.getTaxMultiplier()).toFixed(2)}</b> after tax)
        </Typography>
      ))}
      <Grid container>
        <Grid item xs={4}>
          <Typography variant='button'>
            <b>Subtotal: </b>
          </Typography>
        </Grid>
        <Grid item xs={8}>
          <Typography variant='button'>
            ${bill.computeSubTotalPrice().toFixed(2)}
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant='button'>
            <b>Tax: </b>
          </Typography>
        </Grid>
        <Grid item xs={8}>
          <Typography variant='button'>
            ${(bill.computeTotalPrice() - bill.computeSubTotalPrice()).toFixed(2)}
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant='button'>
            <b>Total: </b>
          </Typography>
        </Grid>
        <Grid item xs={8}>
          <Typography variant='button'>
            ${bill.computeTotalPrice().toFixed(2)}
          </Typography>
        </Grid>
      </Grid>
    </Stack>
  )
}


export default ComputedBill