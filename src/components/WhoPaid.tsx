import {Bill} from "../hooks/useBill";
import {Box, Stack, Typography} from "@mui/material";
import UserChip from "./generic/UserChip";

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
      <Box display='flex' gap={0.5} flexWrap='wrap' justifyContent='center'>
        {bill.users.map((user) => (
          <UserChip
            key={user.id}
            label={user.name}
            color={bill.whoPaid && bill.whoPaid.id === user.id ? 'primary' : 'default'}
            filled
            onClick={() => bill.selectWhoPaid(user)}
          />
        ))}
      </Box>
    </Stack>
  )
}

export default WhoPaid
