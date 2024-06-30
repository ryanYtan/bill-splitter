import {Alert, Box, Grid, Paper, Typography} from '@mui/material'
import UserList from './components/UserList';
import ItemizedBill from './components/ItemizedBill';
import styled from '@emotion/styled';
import useBill from "./hooks/useBill";
import React from "react";
import WhoPaid from "./components/WhoPaid";

const PREFIX = 'App'
const classes = {
  gridContainer: `${PREFIX}-grid-container`,
  gridItem: `${PREFIX}-grid-item`,
  gridItemPaper: `${PREFIX}-grid-item-paper`,
}
const Root = styled('div')({
  [`& .${classes.gridContainer}`]: {
    display: 'flex',
    justifyContent: 'center',
  },
  [`.${classes.gridItem}`]: {
    display: 'flex',
    justifyContent: 'center',
  },
  [`.${classes.gridItemPaper}`]: {
    width: '100%',
  }
})

const App = () => {
  const { users, addUser, deleteUser, hasUser, items, addItem, deleteItem, getUsersForItem, removeUserFromItem, addUserToItem, whoPaid, selectWhoPaid } = useBill()

  return (
    <Root>
      <Grid container spacing={2} className={classes.gridContainer} sx={{ pt: { xs: 1, md: 10 }, px: { xs: 2, md: 5 } }}>

        {/* Header */}
        <Grid item xs={12}>
          <Box mt={2} textAlign='center'>
            <Typography variant='h1' fontSize={24} fontWeight='bold'>
              Simple Bill Splitter
            </Typography>
          </Box>
        </Grid>

        {/* Add users */}
        <Grid item xs={12} lg={4} className={classes.gridItem}>
          <Paper className={classes.gridItemPaper}>
            <UserList users={users} addUser={addUser} deleteUser={deleteUser} hasUser={hasUser} />
          </Paper>
        </Grid>

        <Grid item xs={12} lg={4} className={classes.gridItem}>
          <Paper className={classes.gridItemPaper}>
            <ItemizedBill
              users={users}
              addItem={addItem}
              deleteItem={deleteItem}
              items={items}
              getUsersForItem={getUsersForItem}
              removeUserFromItem={removeUserFromItem}
              addUserToItem={addUserToItem}
            />
          </Paper>
        </Grid>
        <Grid item xs={12} lg={4} className={classes.gridItem}>
          <Paper className={classes.gridItemPaper}>
            <WhoPaid users={users} whoPaid={whoPaid} selectWhoPaid={selectWhoPaid} />
          </Paper>
        </Grid>
      </Grid>
    </Root>
  );
}

export default App;
