import React from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import * as Colors from '@material-ui/core/colors';

import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';

import AppBar from '../AppBar';
import ChartCard from '../ChartCard';

import './App.css';


const theme = createMuiTheme({
  // palette: {
  //   primary: {
  //     main: '#ffffff',
  //   },
  //   secondary: Colors.blue,
  // },
  typography: {
    fontFamily: [
      'Jost', 
      'sans-serif'
    ].join(','),
  },
  status: {
    danger: Colors.orange,
  },
});

function App() {

  return (
    <ThemeProvider theme={theme}>
      <AppBar />
      <Container maxWidth="md" className="App">
        <Grid container spacing={5}>
          {/* <Grid item xs={4}>
            <ChartCard title={'Casos em Pouso Alegre'}>
            </ChartCard>
          </Grid>
          <Grid item xs={4}>
            <ChartCard title={'Casos em Pouso Alegre'}>
            </ChartCard>
          </Grid>
          <Grid item xs={4}>
            <ChartCard title={'Casos em Pouso Alegre'}>
            </ChartCard>
          </Grid> */}
          <Grid item xs={12}>
            <ChartCard city={'Pouso Alegre'}/>
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
}

export default App;
