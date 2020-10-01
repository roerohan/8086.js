import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { setTheme, selectTheme } from 'slices/emulatorSlice';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdjust } from '@fortawesome/free-solid-svg-icons';
import Fab from '@material-ui/core/Fab';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const THEMES = [
    'dracula',
    'terminal',
    'xcode',
    'monokai',
    'chrome',
    'github',
    'gruvbox',
];

const useStyle = makeStyles((theme) => ({
    fab: {
        position: 'absolute',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    },
}));

export default function ThemeEditor() {
    const [anchorEl, setAnchorEl] = useState(null);

    const dispatch = useDispatch();

    const classes = useStyle();

    const currentTheme = useSelector(selectTheme);

    const handleToOpenMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleToCloseMenu = () => {
        setAnchorEl(null);
    };

    const handleChangeTheme = (theme) => {
        const callback = () => {
            // change theme
            dispatch(setTheme(theme));

            // close menu
            handleToCloseMenu();
        };

        return callback;
    };

    return (
        <div>
            <Fab
                aria-label="Theme"
                className={classes.fab}
                aria-haspopup="true"
                onClick={handleToOpenMenu}
            >
                <FontAwesomeIcon icon={faAdjust} />
            </Fab>

            {/* Menu with themes */}
            <Menu
                id="theme-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleToCloseMenu}
            >
                { THEMES.map((theme) => (
                    <MenuItem
                        selected={theme === currentTheme}
                        key={Math.random()}
                        onClick={handleChangeTheme(theme)}
                    >
                        { theme.replace(/^\w/, (letter) => letter.toUpperCase()) }
                    </MenuItem>
                )) }
            </Menu>
        </div>
    );
}