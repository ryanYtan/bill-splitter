import { Box, Chip, Stack, TextField } from '@mui/material'
import FaceIcon from '@mui/icons-material/Face';
import React, { useState } from 'react'
import {Bill} from "../hooks/useBill";

export interface UserListProps {
  bill: Bill
}

const UserList = (props: UserListProps) => {
  const { bill } = props

  const [name, setName] = useState('')
  const [error, setError] = useState('')

  const validateName = (name: string) => {
    if (bill.users.find((user) => user.name === name)) {
      setError('Name already exists')
    } else {
      setError('')
    }
  }

  const handleTyping = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
    validateName(e.target.value)
  }

  const addPerson: React.FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault()
    if (!name) {
      setError('Name is required')
      return
    }
    if (bill.users.find((user) => user.name === name)) {
      setError('Name already exists')
      return
    }
    bill.addUser(name as string)
    setName('')
    setError('')
  }

  return (
    <Stack px={1} py={1} spacing={2}>
      <Box>
        {bill.users.map((user) => (
          <Chip
            key={user.id}
            label={user.name}
            icon={<FaceIcon />}
            size='small'
            variant='outlined'
            onDelete={() => bill.deleteUser(user)}
            sx={{ m: 0.5 }}
          />
        ))}
      </Box>
      <Box px={1}>
        <form onSubmit={addPerson}>
          <TextField
            fullWidth
            name='name'
            size='small'
            variant='standard'
            placeholder='Enter names here'
            type='text'
            value={name}
            onChange={handleTyping}
            error={!!error}
            helperText={error}
            InputProps={{
              autoComplete: 'off',
            }}
          />
        </form>
      </Box>
    </Stack>
  )
}

export default UserList

    //<List>
    //  {people.map((person) => (
    //    <>
    //      <ListItem
    //        secondaryAction={
    //          <IconButton edge='end' onClick={() => handleDeletePerson(person)}>
    //            <DeleteIcon />
    //          </IconButton>
    //        }
    //      >
    //        <ListItemIcon>
    //          <AccountCircleIcon />
    //        </ListItemIcon>
    //        <ListItemText>
    //          {person.name}
    //        </ListItemText>
    //      </ListItem>
    //      <Divider />
    //    </>
    //  ))}
    //  <form onSubmit={handleAddPerson}>
    //    <ListItem
    //      secondaryAction={
    //        <IconButton edge='end' type='submit'>
    //          <AddIcon />
    //        </IconButton>
    //      }
    //    >
    //      <ListItemIcon>
    //        <AccountCircleIcon />
    //      </ListItemIcon>
    //      <TextField
    //        fullWidth
    //        name='name'
    //        size='small'
    //        placeholder='Name of person...'
    //        type='text'
    //        value={name}
    //        variant='standard'
    //        onChange={handleTyping}
    //        error={!!error}
    //        helperText={error}
    //        sx={{ marginBottom: -1 }}
    //      />
    //    </ListItem>
    //  </form>
    //</List>
