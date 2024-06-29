import { Alert, Grid, Paper, Typography } from '@mui/material'
import { useState } from 'react'
import { Person } from './types/Person'
import { Item } from './types/Item'
import UserList from './components/UserList';
import ItemizedBill from './components/ItemizedBill';
import styled from '@emotion/styled';

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
  const [people, setPeople] = useState<Person[]>([]);
  const [items, setItems] = useState<Item[]>([]);

  const handleAddPerson = (name: string) => {
    setPeople([...people, { name }]);
  }

  const handleDeletePerson = (person: Person) => {
    setPeople(people.filter((person2) => person2.name !== person.name));
    setItems(items.map((item) => {
      const newContributed = item.contributed.filter(p => p.name !== person.name)
      return { ...item, contributed: newContributed }
    }))
  }

  return (
    <Root>
      <Grid container spacing={2} className={classes.gridContainer} sx={{ pt: { xs: 1, md: 10 }, px: { xs: 2, md: 5 } }}>

        {/* Header */}
        <Grid item xs={12}>
          <Alert icon={false} sx={{ display: 'block', textAlign: 'center' }}>
            <Typography variant='h1' fontSize={24}>
              Simple Bill Splitter
            </Typography>
          </Alert>
        </Grid>

        {/* Add users */}
        <Grid item xs={12} lg={4} className={classes.gridItem}>
          <Paper className={classes.gridItemPaper}>
            <UserList people={people} handleAddPerson={handleAddPerson} handleDeletePerson={handleDeletePerson} />
          </Paper>
        </Grid>

        <Grid item xs={12} lg={4} className={classes.gridItem}>
          <Paper className={classes.gridItemPaper}>
            <ItemizedBill allPeople={people} items={items} setItems={setItems} />
          </Paper>
        </Grid>
        <Grid item xs={12} lg={4} className={classes.gridItem}>
          <Paper className={classes.gridItemPaper}>
          </Paper>
        </Grid>

      </Grid>
    </Root>
  );
}

export default App;
