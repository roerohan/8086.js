import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
    display: {
        width: 'inherit',
        height: '40%',
        background: '#21222C',
        borderRadius: '0.5rem',
        padding: '0.5rem',
        border: '1px solid #44475A',
    },
    heading: {
        borderBottom: '1px solid #44475A',
        paddingBottom: '0.5rem',
    },
}));

export default function Display() {
    const classes = useStyles();

    return (
        <div className={classes.display}>
            <div className={classes.heading}>Display</div>
        </div>
    );
}
