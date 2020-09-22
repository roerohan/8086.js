import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Register from '../Register';

const useStyles = makeStyles(() => ({
    regAndMem: {
        textAlign: 'left',
        marginTop: '2rem',
        display: 'flex',
    },
    regRow: {
        width: '12rem',
    },
}));

export default function RegAndMem() {
    const classes = useStyles();
    return (
        <div className={classes.regAndMem}>
            <div className={classes.regRow}>
                <Register name="AX" />
                <Register name="BX" />
                <Register name="CX" />
                <Register name="DX" />
                <Register name="BP" />
                <Register name="SP" />
            </div>
            <div className={classes.regRow}>
                <Register name="SI" />
                <Register name="DI" />
                <Register name="DS" />
                <Register name="ES" />
                <Register name="SS" />
                <Register name="CS" />
            </div>
        </div>
    );
}
