import React from 'react';

import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-assembly_x86';
import 'ace-builds/src-noconflict/theme-dracula';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        height: '100vh',
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

export default function Home() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={6}>
                    <Paper className={classes.paper}>Content for the left half.</Paper>
                </Grid>
                <Grid item xs={6}>
                    <AceEditor
                        mode="assembly_x86"
                        theme="dracula"
                        // onChange={onChange}
                        name="editor"
                        editorProps={{ $blockScrolling: true }}
                    />
                </Grid>
            </Grid>
        </div>
    );
}
