import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import { Paper } from '@material-ui/core';

import { selectRegisters, selectMemory } from '../../slices/emulatorSlice';
import Register from '../Register';

const useStyles = makeStyles((theme) => ({
    regAndMem: {
        textAlign: 'left',
        marginTop: '2rem',
        display: 'flex',
    },
    regRow: {
        width: '12rem',
    },
    paper: {
        color: theme.palette.text.primary,
        borderRadius: '0.5rem',
        padding: '0.5rem',
        border: '1px solid #44475A',
        width: '27vw',
        height: '43vh',
        background: '#21222C',
        overflowY: 'scroll',
    },
    heading: {
        borderBottom: '1px solid #44475A',
        paddingBottom: '0.5rem',
        textAlign: 'center',
        position: 'sticky',
    },
    memoryRow: {
        width: '100%',
        marginTop: '0.1rem',
        paddingBottom: '0.5rem',
        borderBottom: '1px solid #44475A',
    },
    memHeading: {
        fontWeight: 'bold',
        marginTop: '0.5rem',
        paddingBottom: '0.5rem',
        borderBottom: '1px solid #44475A',
    },
    address: {
        width: '10rem',
        display: 'inline-block',
        marginLeft: '3rem',
        textAlign: 'center',
    },
    value: {
        textAlign: 'center',
        display: 'inline-block',
        width: '15rem',
    },
}));

export default function RegAndMem() {
    const classes = useStyles();

    const registers = useSelector(selectRegisters);
    const memory = useSelector(selectMemory);

    console.log(memory);

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
                <Paper className={classes.paper}>
                    <div className={classes.heading}>Memory</div>
                    <div>
                        <div className={classes.memHeading}>
                            <span className={classes.address}>Address</span>
                            <span className={classes.value}>Value</span>
                        </div>
                        {memory.map((item, index) => (
                            <div className={classes.memoryRow}>
                                <span className={classes.address}>
                                    {index}
                                </span>
                                <span className={classes.value}>
                                    {item}
                                </span>
                            </div>
                        ))}
                    </div>
                </Paper>
            </div>
        </div>
    );
}
