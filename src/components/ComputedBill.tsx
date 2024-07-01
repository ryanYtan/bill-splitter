import {Bill} from "../hooks/useBill";
import {Box, Stack, Typography} from "@mui/material";
import React from "react";

interface ComputedBillProps {
  bill: Bill
}

const ComputedBill = (props: ComputedBillProps) => {
  const { bill } = props

  const lines: string[] = (() => {
    let ret: string[] = []
    ret.push('===== COMPUTED SUMMARY =====')
    ret.push(`## Total Contributors: ${bill.users.length}`)
    ret.push(`## Total Items: ${bill.items.length}`)
    ret.push(`## Paid By: ${bill.whoPaid?.name}`)
    ret.push('')

    //first check if there are users that are not assigned to any items
    const unassignedUsers = bill.users.filter(user => bill.items.every(item => !bill.userHasItem(user, item)))
    if (unassignedUsers.length > 0) {
      for (const user of unassignedUsers) {
        ret.push(`WARNING: ${user.name} has not contributed to any part of the bill`)
      }
      ret.push('')
    }

    //then check if there are items that are not assigned to any users
    const unassignedItems = bill.items.filter(item => bill.getUsersForItem(item).length === 0)
    if (unassignedItems.length > 0) {
      for (const item of unassignedItems) {
        ret.push(`WARNING: ${item.title} has not been assigned to any person`)
      }
      ret.push('')
    }

    const whoOwesWho = bill.whoOwesWho()
    for (const result of whoOwesWho) {
      const owed = result.amount
      if (bill.whoPaid && result.payer.id === bill.whoPaid.id) {
        ret.push(`${result.payer.name} paid for everyone.`)
        ret.push(`Contributed $${owed.toFixed(2)}.`)
        ret.push(`($${(owed * bill.getTaxMultiplier()).toFixed(2)} after tax)`)
        ret.push('')
      } else {
        ret.push(`${result.payer.name} owes ${result.payee.name} $${result.amount.toFixed(2)}`)
        ret.push(`($${(owed * bill.getTaxMultiplier()).toFixed(2)} after tax)`)
        ret.push('')
      }
    }
    ret.push('')
    ret.push(`Subtotal:          $${bill.computeSubTotalPrice().toFixed(2)}`)
    ret.push(`Tax:               $${(bill.computeTotalPrice() - bill.computeSubTotalPrice()).toFixed(2)}`)
    ret.push(`Total (after tax): $${bill.computeTotalPrice().toFixed(2)}`)
    return ret
  })()

  return (
    <Stack p={2} spacing={1} sx={{ fontFamily: 'monospace' }}>
      <pre>
        {lines.map((line, index) => (
          <>{line}{'\n'}</>
        ))}
      </pre>
    </Stack>
  )
}


export default ComputedBill