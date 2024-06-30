import {User} from "../hooks/useBill";
import React from "react";
import {Box, Chip, Stack, Typography} from "@mui/material";
import FaceIcon from "@mui/icons-material/Face";

export interface WhoPaidProps {
  users: User[]
  whoPaid: User | null
  selectWhoPaid: (user: User) => void
}

const WhoPaid = (props: WhoPaidProps) => {
  const { users, whoPaid, selectWhoPaid } = props

  return (
    <Stack px={1} pb={1} pt={2} spacing={1} alignItems='center'>
      <Typography variant='body1' fontSize={16}>
        Who paid?
      </Typography>
      <Box>
        {users.map((user) => (
          <Chip
            key={user.id}
            label={user.name}
            icon={<FaceIcon />}
            size='small'
            color={whoPaid && whoPaid.id === user.id ? 'primary' : 'default'}
            variant='filled'
            sx={{ m: 0.5 }}
            onClick={() => selectWhoPaid(user)}
          />
        ))}
      </Box>
    </Stack>
  )
}

export default WhoPaid