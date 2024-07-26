import { Box, Chip, Stack, TextField } from '@mui/material'
import FaceIcon from '@mui/icons-material/Face';
import React, { useState } from 'react'
import {Bill} from "../hooks/useBill";
import UserChip from './generic/UserChip';

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
      <Box display='flex' gap={0.5} flexWrap='wrap' justifyContent='center'>
        {bill.users.map((user) => (
          <UserChip
            key={user.id}
            label={user.name}
            onDelete={() => bill.deleteUser(user)}
            outlined
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
