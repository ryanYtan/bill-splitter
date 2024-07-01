import React from "react";
import {Box, Checkbox, Divider, List, ListItem, Stack, TextField, Typography} from "@mui/material";
import {Bill} from "../hooks/useBill";
import styled from "@emotion/styled";

const PREFIX = 'Options'
const classes = {
  taxContainer: `${PREFIX}-tax-container`,
}

const Root = styled('div')({
  [`& .${classes.taxContainer}`]: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 1,
  },
})

interface OptionsProps {
  bill: Bill
}

const Options = (props: OptionsProps) => {
  const { bill } = props

  return (
    <Root>
      <List>
        {bill.taxes && bill.taxes.map((tax, index) => (
          <>
            <ListItem
              secondaryAction={
                <Checkbox
                  checked={tax.isApplied}
                  onChange={() => bill.setTax({ ...tax, isApplied: !tax.isApplied })}
                />
              }
            >
              <Stack direction='row' spacing={1} alignItems='center'>
                <Typography variant='button'>
                  Apply
                </Typography>
                <TextField
                  value={tax.percentage}
                  onChange={(e) => bill.setTax({ ...tax, percentage: Number(e.target.value) })}
                  variant='standard'
                  InputProps={{
                    endAdornment: <Typography variant='button'>%</Typography>
                  }}
                  sx={{
                    width: 40,
                  }}
                />
                <Typography variant='button'>
                  {tax.title}
                </Typography>
              </Stack>
            </ListItem>
            {index < bill.taxes.length - 1 && <Divider />}
          </>
        ))}
      </List>
    </Root>
  )
}

export default Options