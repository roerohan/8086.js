import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import propTypes from 'prop-types';

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

    return (
        <div className={classes.regContainer}>
            <span className={classes.label}>{name}</span>
            <input id={name} className={classes.register} />
        </div>
    );
}

Register.propTypes = {
    name: propTypes.string.isRequired,
};
