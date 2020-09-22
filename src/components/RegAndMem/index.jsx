import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';

import { selectRegisters } from '../../slices/emulatorSlice';
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

    const registers = useSelector(selectRegisters);

    return (
        <div className={classes.regAndMem}>
            <div className={classes.regRow}>
                <Register name="AX" value={registers.AX} />
                <Register name="BX" value={registers.BX} />
                <Register name="CX" value={registers.CX} />
                <Register name="DX" value={registers.DX} />
                <Register name="BP" value={registers.BP} />
                <Register name="SP" value={registers.SP} />
            </div>
            <div className={classes.regRow}>
                <Register name="SI" value={registers.SI} />
                <Register name="DI" value={registers.DI} />
                <Register name="DS" value={registers.DS} />
                <Register name="ES" value={registers.ES} />
                <Register name="SS" value={registers.SS} />
                <Register name="CS" value={registers.CS} />
            </div>
            <div>
                Memory goes here.
            </div>
        </div>
    );
}
