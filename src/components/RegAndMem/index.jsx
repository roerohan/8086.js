import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import { Paper } from '@material-ui/core';

import { selectMemory } from 'slices/emulatorSlice';
import Register from 'components/Register';

const useStyles = makeStyles((theme) => ({
    regAndMem: {
        textAlign: 'left',
        marginTop: '2vh',
        display: 'flex',
        overflowX: 'auto',
    },
    regRow: {
        width: '10.5rem',
    },
    paper: {
        color: theme.palette.text.primary,
        borderRadius: '0.5rem',
        padding: '0.5rem',
        border: `1px solid ${theme.palette.border.main}`,
        width: '23rem',
        height: '43vh',
        background: theme.palette.background.raised,
        overflowY: 'scroll',
    },
    heading: {
        borderBottom: `1px solid ${theme.palette.border.main}`,
        paddingBottom: '0.5rem',
        textAlign: 'center',
        position: 'sticky',
    },
    memoryRow: {
        width: '100%',
        marginTop: '0.1rem',
        paddingBottom: '0.5rem',
        borderBottom: `1px solid ${theme.palette.border.main}`,
    },
    memHeading: {
        fontWeight: 'bold',
        marginTop: '0.5rem',
        paddingBottom: '0.5rem',
        borderBottom: `1px solid ${theme.palette.border.main}`,
    },
    address: {
        width: '3rem',
        display: 'inline-block',
        textAlign: 'center',
        marginLeft: '4rem',
    },
    value: {
        textAlign: 'center',
        display: 'inline-block',
        width: '15rem',
    },
}));

export default function RegAndMem() {
    const classes = useStyles();

    const memory = useSelector(selectMemory);

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
            <div className={classes.regRow}>
                <Register name="IP" />
                <Register name="flags" />
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
                            <div key={Math.random() * 10000} className={classes.memoryRow}>
                                <span className={classes.address}>
                                    {index}
                                </span>
                                <span className={classes.value}>
                                    {
                                        (typeof item === 'number')
                                            ? item
                                            : `${item.mnemonic.value} ${item.op1.value} ${item.op2.value}`
                                    }
                                </span>
                            </div>
                        ))}
                    </div>
                </Paper>
            </div>
        </div>
    );
}
