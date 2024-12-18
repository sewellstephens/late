import React from 'react';

import { Late, useLateEditor } from '@sewell_stephens/late-common/react';

import { editableProps } from '@/plate/demo/editableProps';
import { Editor } from '@/registry/default/plate-ui/editor';

const value = [
  {
    children: [
      {
        text: 'This is editable plain text with react and history plugins, just like a <textarea>!',
      },
    ],
    type: 'p',
  },
];

export default function BasicEditorValueDemo() {
  const editor = useLateEditor({ value });

  return (
    <Late editor={editor}>
      <Editor {...editableProps} />
    </Late>
  );
}
