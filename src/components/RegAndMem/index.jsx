import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';

import { selectEmulator } from '../../slices/emulatorSlice';
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

    const registers = useSelector(selectEmulator).getRegisters();

    return (
        <div className={classes.regAndMem}>
            <div className={classes.regRow}>
                <Register name="AX" value={registers.AX.value} />
                <Register name="BX" value={registers.BX.value} />
                <Register name="CX" value={registers.CX.value} />
                <Register name="DX" value={registers.DX.value} />
                <Register name="BP" value={registers.BP.value} />
                <Register name="SP" value={registers.SP.value} />
            </div>
            <div className={classes.regRow}>
                <Register name="SI" value={registers.SI.value} />
                <Register name="DI" value={registers.DI.value} />
                <Register name="DS" value={registers.DS.value} />
                <Register name="ES" value={registers.ES.value} />
                <Register name="SS" value={registers.SS.value} />
                <Register name="CS" value={registers.CS.value} />
            </div>
            <div>
                Memory goes here.
            </div>
        </div>
    );
}
