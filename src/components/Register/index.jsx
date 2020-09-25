import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import propTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import emulator from 'emulator/emulator';
import { selectRegisters, updateRegisters } from 'slices/emulatorSlice';

const useStyles = makeStyles((theme) => ({
    register: {
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
        width: '4rem',
        fontSize: '1.2rem',
        padding: '0.3rem',
        textAlign: 'center',
        border: `1px solid ${theme.palette.text.secondary}`,
    },
    label: {
        width: '3rem',
        display: 'inline-block',
        color: theme.palette.text.secondary,
    },
    regContainer: {
        height: '5rem',
    },
}));

export default function Register(props) {
    const classes = useStyles();
    const { name } = props;
    const registers = useSelector(selectRegisters);
    const dispatch = useDispatch();

    const [regValue, setRegValue] = useState(registers[name]);

    const reg = registers[name];
    useEffect(() => {
        setRegValue(registers[name]);
    }, [reg, name, registers]);

    const changeRegValue = ({ target }) => {
        console.log(target.value);
        emulator.cpu.registers.regs[name].set(target.value);
        setRegValue(target.value);
        dispatch(updateRegisters(registers));
    };

    const displayReg = (r) => r.toString(16).padStart(4, '0');

    return (
        <div className={classes.regContainer}>
            <span className={classes.label}>{name}</span>
            <input
                id={name}
                value={displayReg(regValue)}
                onChange={changeRegValue}
                className={classes.register}
            />
        </div>
    );
}

Register.propTypes = {
    name: propTypes.string.isRequired,
};
