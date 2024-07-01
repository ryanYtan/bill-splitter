import {Bill} from "../hooks/useBill";
import React from "react";
import {Box, Chip, Stack, Typography} from "@mui/material";
import FaceIcon from "@mui/icons-material/Face";

export interface WhoPaidProps {
  bill: Bill
}

const WhoPaid = (props: WhoPaidProps) => {
  const { bill } = props

  return (
    <Stack px={1} pb={1} pt={2} spacing={1} alignItems='center'>
      <Typography variant='body1' fontSize={16}>
        Who paid?
      </Typography>
      <Box>
        {bill.users.map((user) => (
          <Chip
            key={user.id}
            label={user.name}
            icon={<FaceIcon />}
            size='small'
            color={bill.whoPaid && bill.whoPaid.id === user.id ? 'primary' : 'default'}
            variant='filled'
            sx={{ m: 0.5 }}
            onClick={() => bill.selectWhoPaid(user)}
          />
        ))}
      </Box>
    </Stack>
  )
}

export default WhoPaid