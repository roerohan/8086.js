import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    display: {
        width: 'inherit',
        height: '40%',
        background: theme.palette.background.raised,
        borderRadius: '0.5rem',
        padding: '0.5rem',
        border: `1px solid ${theme.palette.border.main}`,
    },
    heading: {
        borderBottom: `1px solid ${theme.palette.border.main}`,
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
