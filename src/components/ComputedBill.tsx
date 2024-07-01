import {Bill} from "../hooks/useBill";
import React, {useState} from "react";
import {Box, Button, Chip, Dialog, Divider, Paper, Stack, Typography} from "@mui/material";
import FaceIcon from "@mui/icons-material/Face";

interface ComputedBillProps {
  bill: Bill
}

const ComputedBill = (props: ComputedBillProps) => {
  const [open, setOpen] = useState(false)
  const { bill } = props

  return (
    <>
      <Box width='100%'>
        <Button fullWidth variant='contained' onClick={() => setOpen(true)}>
          Compute Bill
        </Button>
      </Box>
      <Dialog open={open} fullWidth maxWidth='xl'>
        <Stack p={2} spacing={1}>
          <Typography variant='h3' fontSize={20}>
            Contributors
          </Typography>
          <Box>
            {bill.users.map((user) => (
              <Chip
                key={user.id}
                label={user.name}
                icon={<FaceIcon />}
                size='small'
                variant='outlined'
                sx={{ m: 0.5 }}
              />
            ))}
          </Box>
          <Divider />
          <Typography variant='h3' fontSize={20}>
            Items
          </Typography>
          <Box display='flex' flexDirection='column'>
            {bill.items.map((item) => (
              <Typography variant='body1'>
                {item.title} - ${item.price.toFixed(2)} x {item.quantity} = ${(item.price * item.quantity).toFixed(2)}
              </Typography>
            ))}
            <Typography>
              Total: ${bill.items.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)}
            </Typography>
          </Box>
          <Divider />
          <Typography variant='h3' fontSize={20}>
            Taxes
          </Typography>
          <Box display='flex' flexDirection='column'>
            {bill.taxes.map((tax) => (
              <Typography variant='body1'>
                {tax.title} - {tax.percentage}%
              </Typography>
            ))}
          </Box>
          <Divider />
        </Stack>
      </Dialog>
    </>
  )
}

export default ComputedBill