import { createMuiTheme } from '@material-ui/core';

// Find theme from https://github.com/ajaxorg/ace/blob/master/lib/ace/theme
// Go to CSS for the theme
// background.main = .ace-<theme> background-color
// background.raised = .ace_gutter background-color
// text.primary = .ace_<theme> color OR .ace_type color
// text.secondary = .ace_comment colo
// border.main = text.secondary

const Themes = {
    dracula: createMuiTheme({
        palette: {
            background: {
                main: '#282A36',
                raised: '#21222C',
            },
            text: {
                primary: '#F8F8F2',
                secondary: '#6272A4',
            },
            border: {
                main: '#6272A4',
            },
        },
    }),
    terminal: createMuiTheme({
        palette: {
            background: {
                main: '#000000',
                raised: '#1a0005',
            },
            text: {
                primary: '#ff6347',
                secondary: '#4682b4',
            },
            border: {
                main: '#4682b4',
            },
        },
    }),
    xcode: createMuiTheme({
        palette: {
            background: {
                main: '#FFFFFF',
                raised: '#e8e8e8',
            },
            text: {
                primary: '#333',
                secondary: '#008E00',
            },
            border: {
                main: '#008E00',
            },
        },
    }),
    monokai: createMuiTheme({
        palette: {
            background: {
                main: '#272822',
                raised: '#2F3129',
            },
            text: {
                primary: '#66D9EF',
                secondary: '#75715E',
            },
            border: {
                main: '#75715E',
            },
        },
    }),
    chrome: createMuiTheme({
        palette: {
            background: {
                main: '#FFFFFF',
                raised: '#EBEBEB',
            },
            text: {
                primary: '#000000',
                secondary: '#236E24',
            },
            border: {
                main: '#236E24',
            },
        },
    }),
    github: createMuiTheme({
        palette: {
            background: {
                main: '#FFFFFF',
                raised: '#E8E8E8',
            },
            text: {
                primary: '#000000',
                secondary: '#998',
            },
            border: {
                main: '#998',
            },
        },
    }),
    gruvbox: createMuiTheme({
        palette: {
            background: {
                main: '#1D2021',
                raised: '#1D2021',
            },
            text: {
                primary: '#EBDAB4',
                secondary: '#928375',
            },
            border: {
                main: '#928375',
            },
        },
    }),
};

export default Themes;
