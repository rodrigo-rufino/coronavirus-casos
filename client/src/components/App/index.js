import React from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import * as Colors from '@material-ui/core/colors';

import Grid from '@material-ui/core/Grid';

import AppBar from '../AppBar';
import SimpleCard from '../CardWrapper';

import './App.css';


const theme = createMuiTheme({
  // palette: {
  //   primary: {
  //     main: '#ffffff',
  //   },
  //   secondary: Colors.blue,
  // },
  status: {
    danger: Colors.orange,
  },
});

function App() {

  return (
    <ThemeProvider theme={theme}>
      <AppBar />
      <div className="App">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <SimpleCard />
          </Grid>
        </Grid>
      </div>
    </ThemeProvider>
  );
}

export default App;
