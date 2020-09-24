import React, { useCallback, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import propTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import emulator from '../../emulator/emulator';
import { selectRegisters, updateRegisters } from '../../slices/emulatorSlice';

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

// convert a decimal number [toConvert] to a number with base [base] and pad with zeros
const convertAndPad = (toConvert, base) => toConvert.toString(base).padStart(4, '0');

const maxRegisterValue = 0xffff;

export default function Register(props) {
    const classes = useStyles();
    const { base, name } = props;
    const registers = useSelector(selectRegisters);
    const dispatch = useDispatch();

    const [regValue, setRegValue] = useState(convertAndPad(registers[name], base));
    const reg = registers[name];
    useEffect(() => {
        setRegValue(convertAndPad(registers[name], base));
    }, [reg, name, registers]);

    const changeRegValue = ({ target }) => {
        const registerValue = parseInt(target.value, base);

        // ensure the user did not enter a value that exceeds a 16 bit value and
        // that an invalid value was not entered (e.g. 'r')
        if (registerValue <= maxRegisterValue && registerValue.toString(16) === target.value) {
            console.log(target.value, registerValue);
            emulator.cpu.registers.regs[name].set(registerValue);
            setRegValue(target.value);
            dispatch(updateRegisters(registers));
        }
    };

    const handleBlur = useCallback(({ target }) => {
        setRegValue(target.value.padStart(4, '0'));
    }, [regValue]);

    return (
        <div className={classes.regContainer}>
            <span className={classes.label}>{name}</span>
            <input
                id={name}
                value={regValue}
                onBlur={handleBlur}
                onChange={changeRegValue}
                className={classes.register}
            />
        </div>
    );
}

Register.propTypes = {
    name: propTypes.string.isRequired,
    base: propTypes.number,
};

Register.defaultProps = {
    base: 16,
};
