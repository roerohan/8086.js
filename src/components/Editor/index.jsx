import React from 'react';

import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-assembly_x86';
import 'ace-builds/src-noconflict/theme-dracula';

export default function Editor() {
    return (
        <AceEditor
            mode="assembly_x86"
            fontSize="1rem"
            theme="dracula"
            // onChange={onChange}
            showPrintMargin={false}
            height="100vh"
            width="50vw"
            name="editor"
            editorProps={{ $blockScrolling: true }}
        />
    );
}
