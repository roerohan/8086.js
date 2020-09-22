import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faPlayCircle,
    faForward,
    faArrowRight,
    faArrowLeft,
} from '@fortawesome/free-solid-svg-icons';

const useStyles = makeStyles((theme) => ({
    buttonsContainer: {
        background: theme.palette.background.default,
        color: theme.palette.text.primary,
        padding: '1.2rem',
    },
    fontAwesomeIcon: {
        width: '3rem',
        display: 'inline-block',
        textAlign: 'center',
    },
}));

export default function ButtonsContainer() {
    const classes = useStyles();

    return (
        <div className={classes.buttonsContainer}>
            <span className={classes.fontAwesomeIcon}>
                <FontAwesomeIcon icon={faArrowLeft} />
            </span>
            <span className={classes.fontAwesomeIcon}>
                <FontAwesomeIcon icon={faPlayCircle} />
            </span>
            <span className={classes.fontAwesomeIcon}>
                <FontAwesomeIcon icon={faForward} />
            </span>
            <span className={classes.fontAwesomeIcon}>
                <FontAwesomeIcon icon={faArrowRight} />
            </span>
        </div>
    );
}
