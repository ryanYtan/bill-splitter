import { Chip } from "@mui/material"
import FaceIcon from '@mui/icons-material/Face';

interface UserChipProps {
  label: string
  filled?: boolean
  outlined?: boolean
  color?: 'primary' | 'secondary' | 'default'
  onDelete?: () => void
  onClick?: () => void
}

const UserChip = (props: UserChipProps) => {
  const {
    label,
    filled = false,
    outlined = false,
    color = 'default',
    onDelete = undefined,
    onClick = undefined,
    ...rest
  } = props

  return (
    <Chip
      label={label}
      icon={<FaceIcon />}
      size='small'
      variant={filled ? 'filled' : outlined ? 'outlined' : 'filled'}
      onDelete={onDelete}
      onClick={onClick}
      color={color}
      {...rest}
    />
  )
}

export default UserChip
