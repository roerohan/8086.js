import React from 'react';
import { useDispatch } from 'react-redux';

import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-assembly_x86';
import 'ace-builds/src-noconflict/theme-dracula';

import { updateCode } from '../../slices/emulatorSlice';
import ButtonsContainer from '../ButtonsContainer';

export default function Editor() {
    const dispatch = useDispatch();

    const onChange = (code) => {
        dispatch(updateCode(code));
    };

    return (
        <div>
            <ButtonsContainer />

            <AceEditor
                mode="assembly_x86"
                fontSize="1rem"
                theme="dracula"
                onChange={onChange}
                showPrintMargin={false}
                height="100vh"
                width="50vw"
                name="editor"
                editorProps={{ $blockScrolling: true }}
            />
        </div>
    );
}
