import React from 'react';
import AceEditor from 'react-ace';

import 'ace-builds/src-noconflict/mode-assembly_x86';
import 'ace-builds/src-noconflict/theme-dracula';

export default function Home() {
    return (
        <AceEditor
            mode="assembly_x86"
            theme="dracula"
            // onChange={onChange}
            name="editor"
            editorProps={{ $blockScrolling: true }}
        />
    );
}
