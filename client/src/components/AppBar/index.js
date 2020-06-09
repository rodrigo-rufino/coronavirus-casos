import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';

import ChartCard from '../ChartCard';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
    textAlign: 'center',
    margin: '20px'
  },
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  }
}));

export default function SimpleTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Typography variant="h4" className={classes.title}>
          CORONAVÍRUS
        </Typography>
        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example" centered>
          <Tab label='Pouso Alegre' {...a11yProps(0)} />
          <Tab label='Santa Rita do Sapucaí' {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <Container maxWidth="md" className="App">
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <ChartCard city={'Pouso Alegre'}/>
            </Grid>
          </Grid>
        </Container>
      </TabPanel>
      <TabPanel value={value} index={1}>
      <Container maxWidth="md" className="App">
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <ChartCard city={'Santa Rita do Sapucaí'}/>
            </Grid>
          </Grid>
        </Container>
      </TabPanel>
    </div>
  );
}