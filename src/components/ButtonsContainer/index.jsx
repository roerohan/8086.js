import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faPlayCircle,
    faForward,
    faArrowRight,
    faArrowLeft,
} from '@fortawesome/free-solid-svg-icons';
import { selectCode, selectEmulator } from '../../slices/emulatorSlice';

const useStyles = makeStyles((theme) => ({
    buttonsContainer: {
        background: theme.palette.background.default,
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
    },
}));

export default function ButtonsContainer() {
    const classes = useStyles();

    const emulator = useSelector(selectEmulator);
    const code = useSelector(selectCode);

    const loadCode = () => {
        emulator.loadCode(code);
    };

    const stepClick = () => {
        console.log(emulator);
        loadCode();
        emulator.cpu.step();
        console.log(emulator);
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
