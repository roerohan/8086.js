import React from 'react';
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
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
    },
}));

export default function Emulator() {
    const classes = useStyles();

    return (
        <Paper className={classes.paper}>
            <Display />
            <RegAndMem />
        </Paper>
    );
}
