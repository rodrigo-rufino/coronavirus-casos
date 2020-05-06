import React from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import * as Colors from '@material-ui/core/colors';

import AppBar from '../AppBar';
import SimpleLineChart from '../SimpleLineChart';

import './App.css';


const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#ffffff',
    },
    secondary: Colors.blue,
  },
  status: {
    danger: Colors.orange,
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <AppBar></AppBar>
        <SimpleLineChart></SimpleLineChart>
      </div>
    </ThemeProvider>
  );
}

export default App;
