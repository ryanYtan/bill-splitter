import {Alert, Box, Container, Grid, Paper, Typography} from '@mui/material'
import UserList from './components/UserList';
import ItemizedBill from './components/ItemizedBill';
import styled from '@emotion/styled';
import useBill from "./hooks/useBill";
import React from "react";
import WhoPaid from "./components/WhoPaid";
import Options from "./components/Options";
import ComputedBill from "./components/ComputedBill";

const PREFIX = 'App'
const classes = {
  gridContainer: `${PREFIX}-grid-container`,
  gridItem: `${PREFIX}-grid-item`,
  gridItemPaper: `${PREFIX}-grid-item-paper`,
}
const Root = styled('div')({
  overscrollBehavior: 'contain',
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
  const bill = useBill()

  return (
    <Root>
      <Container maxWidth='sm' sx={{ pt: 2, pb: 2, px: 2 }}>
        <Grid container spacing={2} className={classes.gridContainer}>
          <Grid item xs={12} display='flex' justifyContent='center' mt={2} mb={1}>
            <Typography variant='h1' fontSize={24} fontWeight='bold'>
              Simple Bill Splitter
            </Typography>
          </Grid>

          <Grid item xs={12} className={classes.gridItem}>
            <Paper className={classes.gridItemPaper}>
              <UserList bill={bill} />
            </Paper>
          </Grid>

          <Grid item xs={12} className={classes.gridItem}>
            <Paper className={classes.gridItemPaper}>
              <ItemizedBill bill={bill} />
            </Paper>
          </Grid>
          {bill.users.length > 0 && (
            <Grid item xs={12} className={classes.gridItem}>
              <Paper className={classes.gridItemPaper}>
                <WhoPaid bill={bill} />
              </Paper>
            </Grid>
          )}
          {bill.isReadyToComputeBill() && (
            <Grid item xs={12} className={classes.gridItem}>
              <Paper className={classes.gridItemPaper}>
                <ComputedBill bill={bill} />
              </Paper>
            </Grid>
          )}
        </Grid>
      </Container>
    </Root>
  );
}

export default App;
