import React from 'react';
import './App.css';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

import Home from './pages/Home';

/**
 * Theme color references:
 * fgColor: '#f8f8f2',
   bgColor: '#282a36',
   dark: '#44475a',
   primary: '#6272a4',
   primText: '',
   error: '#ff5555',
   default: '#44475a',
   warning: '',
 */

const theme = createMuiTheme({
    palette: {
        type: 'dark',
        background: {
            default: '#282a36',
            paper: '#282a36',
        },
        text: {
            primary: '#f8f8f2',
            secondary: '#6272a4',
        },
    },
});

function App() {
    return (
        <ThemeProvider theme={theme}>
            <Home />
        </ThemeProvider>
    );
}

export default App;
