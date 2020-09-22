import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

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
            Addresses and Registers will be shown here.
        </Paper>
    );
}
