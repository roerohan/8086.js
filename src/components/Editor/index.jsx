import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateCode, selectState, resetRegMemState } from 'slices/emulatorSlice';
import emulator from 'emulator/emulator';

import ButtonsContainer from 'components/ButtonsContainer';
import NotificationError from 'components/NotificationError';
import ThemeEditor from 'components/ThemeEditor';
import AceEditor from 'react-ace';

// themes styles and hightligths
import 'ace-builds/src-noconflict/mode-assembly_x86';
import 'ace-builds/src-noconflict/theme-dracula';
import 'ace-builds/src-noconflict/theme-terminal';
import 'ace-builds/src-noconflict/theme-xcode';
import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/src-noconflict/theme-chrome';
import 'ace-builds/src-noconflict/theme-github';
import 'ace-builds/src-noconflict/theme-gruvbox';

export default function Editor() {
    const dispatch = useDispatch();

    // get state data
    const {
        error,
        code,
        theme,
    } = useSelector(selectState);
    let annotation = {};

    // create annotation using error.
    if (error.isRaised) {
        annotation = {
            row: error.lineNumber - 1,
            column: 0,
            type: 'error',
            text: `${error.name}: ${error.message || error.token}`,
        };
    }

    const onChange = (newCode) => {
        emulator.resetState();
        dispatch(resetRegMemState());
        dispatch(updateCode(newCode));
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
                theme={theme}
                onChange={onChange}
                value={code || defaultMsg}
                showPrintMargin={false}
                height="100vh"
                width="50vw"
                name="editor"
                annotations={[annotation]}
                editorProps={{ $blockScrolling: true }}
            />

            <ThemeEditor />
        </div>
    );
}
