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
      </List>
    </Root>
  )
}

export default Options