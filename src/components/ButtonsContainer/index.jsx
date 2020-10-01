import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faPlayCircle,
    faForward,
    faArrowRight,
    faArrowLeft,
} from '@fortawesome/free-solid-svg-icons';
import {
    selectCode,
    updateRegisters,
    raiseError,
} from 'slices/emulatorSlice';
import emulator from 'emulator/emulator';

const useStyles = makeStyles((theme) => ({
    buttonsContainer: {
        background: theme.palette.background.main,
        color: theme.palette.text.primary,
        padding: '1.2rem',
    },
    fontAwesomeIcon: {
        width: '3rem',
        height: '2rem',
        outline: 'none',
        display: 'inline-block',
        textAlign: 'center',
        background: 'none',
        color: theme.palette.text.primary,
    },
}));

export default function ButtonsContainer() {
    const classes = useStyles();

    const dispatch = useDispatch();

    const code = useSelector(selectCode);

    const loadCode = () => {
        emulator.loadCode(code);
    };

    const stepClick = () => {
        try {
            loadCode();
            emulator.cpu.step();
            dispatch(updateRegisters(emulator.getRegisters()));
        } catch (err) {
            dispatch(raiseError({
                name: err.name,
                token: err.token,
                message: err.message,
                position: err.position,
                lineNumber: err.lineNumber,
            }));
        }
    };

    return (
        <div className={classes.buttonsContainer}>
            <button type="button" className={classes.fontAwesomeIcon}>
                <FontAwesomeIcon icon={faArrowLeft} />
            </button>
            <button type="button" className={classes.fontAwesomeIcon}>
                <FontAwesomeIcon icon={faPlayCircle} />
            </button>
            <button type="button" className={classes.fontAwesomeIcon} onClick={stepClick}>
                <FontAwesomeIcon icon={faArrowRight} />
            </button>
            <button type="button" className={classes.fontAwesomeIcon}>
                <FontAwesomeIcon icon={faForward} />
            </button>
        </div>
    );
}
