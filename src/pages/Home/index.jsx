import React from 'react';

import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

import Editor from 'components/Editor';
import Emulator from 'components/Emulator';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        height: '100vh',
        backgroundColor: theme.palette.background.main,
    },
}));

export default function Home() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Grid container spacing={1}>
                <Grid item xs={6}>
                    <Emulator />
                </Grid>
                <Grid item xs={6}>
                    <Editor />
                </Grid>
            </Grid>
        </div>
    );
}
