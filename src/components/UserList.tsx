import { Autocomplete, Box, Button, Chip, Divider, IconButton, List, ListItem, ListItemIcon, ListItemText, Stack, TextField } from '@mui/material'
import { Person } from '../types/Person'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete'
import FaceIcon from '@mui/icons-material/Face';
import React, { useState } from 'react'

export interface UserListProps {
  people: Person[]
  handleAddPerson: (name: string) => void
  handleDeletePerson: (person: Person) => void
}

const UserList = (props: UserListProps) => {
  const { people, handleAddPerson, handleDeletePerson } = props
  const [name, setName] = useState('')
  const [error, setError] = useState('')

  const validateName = (name: string) => {
    if (people.find((person) => person.name === name)) {
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
    if (people.find((person) => person.name === name)) {
      setError('Name already exists')
      return
    }
    handleAddPerson(name as string)
    setName('')
    setError('')
  }

  return (
    <Stack px={1} py={1} spacing={2}>
      <Box>
        {people.map((person) => (
          <Chip
            key={person.name}
            label={person.name}
            icon={<FaceIcon />}
            size='small'
            variant='outlined'
            onDelete={() => handleDeletePerson(person)}
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
