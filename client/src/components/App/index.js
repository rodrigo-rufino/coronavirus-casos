import React from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import * as Colors from '@material-ui/core/colors';

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
        <SimpleCard />
      </div>
    </ThemeProvider>
  );
}

export default App;
