import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Display from 'components/Display';
import RegAndMem from 'components/RegAndMem';

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.background.main,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    buttonsContainer: {
        background: theme.palette.background.main,
        color: theme.palette.text.primary,
        padding: '.5rem',
    },
    buttonWrapper: {
        display: 'flex',
        backgroundColor: theme.palette.background.raised,
        borderRadius: '0.5rem',
        width: 'auto',
        padding: '5px 2px',
        justifyContent: 'center',
    },
    button: {
        cursor: 'ponter',
        padding: '0.4rem 0.8rem',
        outline: 'none',
        display: 'inline-block',
        textAlign: 'center',
        background: 'transparent',
        color: theme.palette.text.primary,
        border: 'none',
    },
}));

export default function Emulator() {
    const [toggle, setToggle] = useState(false);

    const classes = useStyles();

    return (
        <Paper className={classes.paper}>
            <Display />

            <div className={classes.buttonsContainer}>
                <div className={classes.buttonWrapper}>
                    <button type="button" className={classes.button} onClick={() => setToggle((s) => !s)}>
                        Mostrar Detalles
                    </button>
                </div>
            </div>

            { toggle && <RegAndMem /> }
        </Paper>
    );
}
