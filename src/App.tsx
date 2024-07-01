import {Alert, Box, Grid, Paper, Typography} from '@mui/material'
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
      <Grid container spacing={2} className={classes.gridContainer} sx={{ pt: { xs: 1, md: 10 }, px: { xs: 2, md: 5 } }}>
        <Grid item xs={12} display='flex' justifyContent='center' mt={2} mb={1}>
          <Typography variant='h1' fontSize={24} fontWeight='bold'>
            Simple Bill Splitter
          </Typography>
        </Grid>

        <Grid item xs={12} lg={4} className={classes.gridItem}>
          <Paper className={classes.gridItemPaper}>
            <UserList bill={bill} />
          </Paper>
        </Grid>

        <Grid item xs={12} lg={4} className={classes.gridItem}>
          <Paper className={classes.gridItemPaper}>
            <ItemizedBill bill={bill} />
          </Paper>
        </Grid>
        {bill.users.length > 0 && (
          <Grid item xs={12} lg={4} className={classes.gridItem}>
            <Paper className={classes.gridItemPaper}>
              <WhoPaid bill={bill} />
            </Paper>
          </Grid>
        )}
        <Grid item xs={12} lg={4} className={classes.gridItem}>
          <Paper className={classes.gridItemPaper}>
            <Options bill={bill} />
          </Paper>
        </Grid>
        <Grid item xs={12} lg={4} className={classes.gridItem}>
          <ComputedBill bill={bill} />
        </Grid>
      </Grid>
    </Root>
  );
}

export default App;
