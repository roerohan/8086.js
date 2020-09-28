import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    clearError,
    selectError,
} from 'slices/emulatorSlice';

// components
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import Collapse from '@material-ui/core/Collapse';

export default function NotificationError() {
    const dispatch = useDispatch();
    const error = useSelector(selectError);

    const closeNotification = () => {
        dispatch(clearError());
    };

    return (
        <Collapse in={error.isRaised}>
            <Alert severity="error" onClose={closeNotification}>
                <AlertTitle>
                    {`${error.name}: ${error.message || error.token}`}
                </AlertTitle>

                {
                    error.position
                        ? (
                            <>
                                Please check out line:
                                <strong>
                                    {` ${error.lineNumber}`}
                                </strong>
                            </>
                        )
                        : null
                }

            </Alert>
        </Collapse>
    );
}
