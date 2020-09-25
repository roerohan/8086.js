import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-assembly_x86';
import 'ace-builds/src-noconflict/theme-dracula';

import { updateCode, selectError, selectCode } from 'slices/emulatorSlice';
import ButtonsContainer from 'components/ButtonsContainer';
import NotificationError from 'components/NotificationError';

export default function Editor() {
    const dispatch = useDispatch();

    const error = useSelector(selectError);
    const codeStorage = useSelector(selectCode);
    let annotation = {};

    if (error.isRaised) {
        annotation = {
            row: error.lineNumber - 1,
            column: 0,
            type: 'error',
            text: `${error.name}: ${error.message || error.token}`,
        };
    }

    const onChange = (code) => {
        dispatch(updateCode(code));
    };

    const defaultMsg = `; Welcome to 8086.js!
;
; This is still under development and supports few instructions such as MOV, ADD, AND, etc.
; Currently, it does not support pre-processor directives or interrupts.
; Contribute to 8086.js at https://github.com/roerohan/8086.js :D

`;

    return (
        <div>
            <NotificationError />

            <ButtonsContainer />

            <AceEditor
                mode="assembly_x86"
                fontSize="1rem"
                theme="dracula"
                cursorStart={6}
                onChange={onChange}
                value={codeStorage || defaultMsg}
                showPrintMargin={false}
                height="100vh"
                width="50vw"
                name="editor"
                annotations={[annotation]}
                editorProps={{ $blockScrolling: true }}
            />
        </div>
    );
}
