import React from 'react';
import 'App.css';
import { ThemeProvider } from '@material-ui/styles';
import { useSelector } from 'react-redux';

import Home from 'pages/Home';

import { selectTheme } from 'slices/emulatorSlice';
import Themes from './constants/Themes';

function App() {
    const themeName = useSelector(selectTheme);
    const theme = Themes[themeName];

    return (
        <ThemeProvider theme={theme}>
            <Home />
        </ThemeProvider>
    );
}

export default App;
