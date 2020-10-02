import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faPlay,
    faForward,
    faArrowRight,
    faArrowLeft,
} from '@fortawesome/free-solid-svg-icons';
import {
    selectCode,
    selectState,
    updateRegisters,
    raiseError,
    stepBack,
    updateMemory,
} from 'slices/emulatorSlice';
import emulator from 'emulator/emulator';

const useStyles = makeStyles((theme) => ({
    buttonsContainer: {
        background: theme.palette.background.main,
        color: theme.palette.text.primary,
        padding: '1.2rem',
    },
    buttonWrapper: {
        display: 'flex',
        backgroundColor: theme.palette.background.raised,
        borderRadius: '0.5rem',
        width: 'auto',
        padding: '5px 2px',
        justifyContent: 'center',
    },
    button: {
        padding: '0.4rem 0.8rem',
        outline: 'none',
        display: 'inline-block',
        textAlign: 'center',
        background: 'transparent',
        color: theme.palette.text.primary,
        border: 'none',
    },
    playIcon: {
        fontSize: '0.7rem',
    },
}));

export default function ButtonsContainer() {
    const classes = useStyles();

    const dispatch = useDispatch();

    const code = useSelector(selectCode);
    const emulatorState = useSelector(selectState);

    const loadCode = () => {
        emulator.loadCode(code);
    };

    const stepClick = () => {
        try {
            loadCode();
            emulator.cpu.step();
            dispatch(updateRegisters(emulator.getRegisters()));
            dispatch(updateMemory(emulator.getMemory()));
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

    const stepBackClick = () => {
        const len = emulatorState.registers.past.length;

        Object.entries(emulatorState.registers.past[len - 1])
            .map((o) => {
                const [k, v] = o;
                if (
                    ['H', 'L'].includes(k[1])
                    && ['A', 'B', 'C', 'D'].includes(k[0])
                ) {
                    emulator.cpu.registers.regs[`${k[0]}X`].set(v, k[1]);
                } else {
                    emulator.cpu.registers.regs[k].set(v);
                }
                return o;
            });

        Object.values(emulatorState.memory.past[len - 1])
            .map((v, i) => {
                emulator.cpu.memory.set(i, v);
                return v;
            });

        dispatch(stepBack());
    };

    return (
        <div className={classes.buttonsContainer}>
            <div className={classes.buttonWrapper}>
                <button type="button" className={classes.button} onClick={stepBackClick}>
                    <FontAwesomeIcon icon={faArrowLeft} />
                </button>
                <button type="button" className={classes.button}>
                    <FontAwesomeIcon icon={faPlay} className={classes.playIcon} />
                </button>
                <button type="button" className={classes.button} onClick={stepClick}>
                    <FontAwesomeIcon icon={faArrowRight} />
                </button>
                <button type="button" className={classes.button}>
                    <FontAwesomeIcon icon={faForward} />
                </button>
            </div>

        </div>
    );
}
