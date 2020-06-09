import React from 'react';
import { createMuiTheme, ThemeProvider, responsiveFontSizes } from '@material-ui/core/styles';
import * as Colors from '@material-ui/core/colors';

import AppBar from '../AppBar';

import './App.css';


let theme = createMuiTheme({
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
theme = responsiveFontSizes(theme);

function App() {

  return (
    <ThemeProvider theme={theme}>
      <AppBar />
    </ThemeProvider>
  );
}

export default App;
