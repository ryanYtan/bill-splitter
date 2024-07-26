import { Box, Stack, TextField } from '@mui/material'
import {Bill} from "../hooks/useBill"
import UserChip from './generic/UserChip'
import { ERR_MSG_REQUIRED } from './helpers/form'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import * as y from 'yup'
import { yupResolver } from "@hookform/resolvers/yup"
import { useEffect, useState } from 'react'

export interface UserListProps {
  bill: Bill
}

const USER_FORM_SCHEMA = y.object({
  name: y
    .string()
    .default('')
    .required(ERR_MSG_REQUIRED),
})
type UserForm = y.InferType<typeof USER_FORM_SCHEMA>

const UserList = (props: UserListProps) => {
  const { bill } = props
  const [ isSubmitSuccess, setIsSubmitSuccess ] = useState(false)

  const {
    control,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm<UserForm>({
    defaultValues: USER_FORM_SCHEMA.getDefault(),
    resolver: yupResolver(USER_FORM_SCHEMA),
  })

  const addPerson: SubmitHandler<UserForm> = (data) => {
    if (bill.users.find((user) => user.name === data.name)) {
      setError('name', { type: 'custom', message: 'Name already exists' })
      return
    }
    bill.addUser(data.name)
    setIsSubmitSuccess(true)
  }

  useEffect(() => {
    if (isSubmitSuccess) {
      reset()
      setIsSubmitSuccess(false)
    }
  }, [isSubmitSuccess])

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
        <form onSubmit={handleSubmit(addPerson)}>
          <Controller
            name='name'
            control={control}
            render={({ field }) => (
               <TextField
                 {...field}
                 fullWidth
                 name='name'
                 size='small'
                 variant='standard'
                 placeholder='Enter names here'
                 type='text'
                 error={!!errors?.name}
                 helperText={errors?.name?.message || ''}
                 InputProps={{
                   autoComplete: 'off',
                 }}
               />
            )}
          />
        </form>
      </Box>
    </Stack>
  )
}

export default UserList
