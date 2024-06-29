import { Box, Chip, Dialog, Divider, Grid, IconButton, Stack, Typography } from "@mui/material"
import { Item } from "../types/Item"
import { Person } from "../types/Person"
import React, { useState } from "react"
import AddIcon from '@mui/icons-material/Add'
import FaceIcon from "@mui/icons-material/Face";

export interface BillItemProps {
  item: Item
  setItem: (item: Item) => void
  allPeople: Person[]
}

const BillItem = (props: BillItemProps) => {
  const { item, setItem, allPeople } = props

  const [openAddPerson, setOpenAddPerson] = useState(false)

  const itemHasPerson = (person: Person) => {
    return item.contributed.some(p => p.name === person.name)
  }

  const handleDeletePerson = (person: Person) => {
    const newContributed = item.contributed.filter(p => p.name !== person.name)
    setItem({ ...item, contributed: newContributed })
  }

  return (
    <>
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
          {item.contributed.map((person) => (
            <Chip
              key={person.name}
              label={person.name}
              icon={<FaceIcon />}
              color='primary'
              size='small'
              sx={{ m: 0.5 }}
              onDelete={() => handleDeletePerson(person)}
            />
          ))}
          <Chip
            icon={<AddIcon />}
            label='Add Person'
            onClick={() => setOpenAddPerson(true)}
            size='small'
            sx={{ m: 0.5 }}
          />
        </Grid>
      </Grid>
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
            <Box>
              {allPeople.map((person) => (
                <Chip
                  key={person.name}
                  label={person.name}
                  icon={<FaceIcon />}
                  color={itemHasPerson(person) ? 'primary' : 'default'}
                  onClick={() => {
                    if (itemHasPerson(person)) {
                      //remove
                      const newContributed = item.contributed.filter(p => p.name !== person.name)
                      setItem({ ...item, contributed: newContributed })
                    } else {
                      //add
                      const newContributed = [...item.contributed, person]
                      setItem({ ...item, contributed: newContributed })
                    }
                  }}
                  sx={{ m: 0.5 }}
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
