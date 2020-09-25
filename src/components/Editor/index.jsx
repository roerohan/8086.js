import React from 'react';
import { useDispatch } from 'react-redux';

import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-assembly_x86';
import 'ace-builds/src-noconflict/theme-dracula';

import { updateCode } from 'slices/emulatorSlice';
import ButtonsContainer from 'components/ButtonsContainer';
import NotificationError from 'components/NotificationError';

export default function Editor() {
    const dispatch = useDispatch();

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
                onChange={onChange}
                value={defaultMsg}
                showPrintMargin={false}
                height="100vh"
                width="50vw"
                name="editor"
                editorProps={{ $blockScrolling: true }}
            />
        </div>
    );
}
