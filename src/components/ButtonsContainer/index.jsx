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
    stepBack,
    stepForward,
    executeStep,
    resetRegMemState,
    raiseError,
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
    disabledIcon: {
        color: theme.palette.text.secondary,
    },
    count: {
        display: 'inline-block',
        fontSize: '0.7rem',
        margin: '0 0.3rem',
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

    const stepForwardClick = () => {
        const len = emulatorState.registers.future.length;
        if (len === 0) return;

        dispatch(stepForward());
    };

    const stepBackClick = () => {
        const len = emulatorState.registers.past.length;
        if (len === 0) return;

        dispatch(stepBack());
    };

    const runFromPointClick = () => {
        Object.entries(emulatorState.registers.present)
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

        Object.values(emulatorState.memory.present)
            .map((v, i) => {
                emulator.cpu.memory.set(i, v);
                return v;
            });

        try {
            loadCode();
            emulator.cpu.step();
            dispatch(executeStep({
                registers: emulator.getRegisters(),
                memory: emulator.getSerialisableMemory(),
            }));
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

    const runAllClick = () => {
        emulator.resetState();
        dispatch(resetRegMemState());

        // eslint-disable-next-line no-constant-condition
        while (true) {
            try {
                loadCode();
                emulator.cpu.step();
                dispatch(executeStep({
                    registers: emulator.getRegisters(),
                    memory: emulator.getSerialisableMemory(),
                }));
            } catch (err) {
                break;
            }
        }
    };

    const pastLength = emulatorState.registers.past.length;
    const backClass = pastLength > 0 ? '' : classes.disabledIcon;

    const futureLength = emulatorState.registers.future.length;
    const forwardClass = futureLength > 0 ? '' : classes.disabledIcon;

    return (
        <div className={classes.buttonsContainer}>
            <div className={classes.buttonWrapper}>
                <button type="button" className={classes.button} onClick={stepBackClick}>
                    <sup className={classes.count}>{pastLength}</sup>
                    <FontAwesomeIcon icon={faArrowLeft} className={backClass} />
                </button>
                <button type="button" className={classes.button} onClick={runFromPointClick}>
                    <FontAwesomeIcon icon={faPlay} className={classes.playIcon} />
                </button>
                <button type="button" className={classes.button} onClick={stepForwardClick}>
                    <FontAwesomeIcon icon={faArrowRight} className={forwardClass} />
                    <sup className={classes.count}>{futureLength}</sup>
                </button>
                <button type="button" className={classes.button} onClick={runAllClick}>
                    <FontAwesomeIcon icon={faForward} />
                </button>
            </div>

        </div>
    );
}
