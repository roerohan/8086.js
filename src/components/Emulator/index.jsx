import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Display from '../Display';

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.primary,
        height: '100vh',
    },
}));

export default function Emulator() {
    const classes = useStyles();

    return (
        <Paper className={classes.paper}>
            <Display />
        </Paper>
    );
}
