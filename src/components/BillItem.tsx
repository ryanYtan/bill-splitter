import { Box, Chip, Dialog, Divider, Grid, Stack, Typography } from "@mui/material"
import { useState } from "react"
import AddIcon from '@mui/icons-material/Add'
import {Bill, Item, User} from "../hooks/useBill";
import UserChip from "./generic/UserChip";

export interface BillItemProps {
  bill: Bill
  item: Item
}

const BillItem = (props: BillItemProps) => {
  const { bill, item } = props

  const [openAddPerson, setOpenAddPerson] = useState(false)

  const itemHasUser = (user: User) => {
    return bill.getUsersForItem(item).find((itemUser) => itemUser.id === user.id) !== undefined
  }

  const handleToggleUserInItem = (user: User) => {
    if (itemHasUser(user)) {
      bill.removeUserFromItem(user, item)
    } else {
      bill.addUserToItem(user, item)
    }
  }

  return (
    <>
      <Grid container>
        <Grid item xs={6}>
          <Box display='flex' flexDirection='column'>
            <Typography variant='body1' fontSize={16} fontWeight='bold' noWrap>
              {item.title}
            </Typography>
            <Typography variant='button'>
              ${item.price.toFixed(2)}{' '} ea
            </Typography>
            <Typography variant='body1' fontSize={12}>
              QTY: {item.quantity}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box display='flex' gap={0.5} flexWrap='wrap'>
            {bill.getUsersForItem(item).map((user) => (
              <UserChip
                key={user.id}
                label={user.name}
                color='primary'
                onDelete={() => bill.removeUserFromItem(user, item)}
              />
            ))}
            <Chip
              icon={<AddIcon />}
              label='Add Person'
              onClick={() => setOpenAddPerson(true)}
              size='small'
            />
          </Box>
        </Grid>
      </Grid>
      <Dialog open={openAddPerson} maxWidth='sm' onClose={() => setOpenAddPerson(false)} fullWidth>
        <Box px={2} py={2}>
          <Stack spacing={1}>
            <Box textAlign='center'>
              <Typography variant='h2' fontSize={28}>
                Add Contributions
              </Typography>
              <Typography variant='caption'>
                Cost is split equally amongst contributors
              </Typography>
            </Box>
            <Divider />
            <Box display='flex' justifyContent='center' flexDirection='column' textAlign='center' width='100%'>
              <Typography variant='body1' fontSize={24} fontWeight='bold'>
                {item?.title}
              </Typography>
              <Box display='flex' gap={1} justifyContent='center' textAlign='center'>
                <Typography variant='button' fontSize={16}>
                  $ {item.price.toFixed(2)}
                </Typography>
                <Typography variant='button' fontSize={16}>
                  (QTY: {item.quantity})
                </Typography>
              </Box>
            </Box>
            <Divider />
            <Box display='flex' gap={0.5} flexWrap='wrap'>
              {bill.users.map((user) => (
                <UserChip
                  key={user.id}
                  label={user.name}
                  color={itemHasUser(user) ? 'primary' : 'default'}
                  onClick={() => handleToggleUserInItem(user)}
                />
              ))}
            </Box>
          </Stack>
        </Box>
      </Dialog>
    </>
  )
}

export default BillItem
