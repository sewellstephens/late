import React from 'react';

import { Late, useLateEditor } from '@sewellstephens/plate-common/react';

import { Editor } from '@/registry/default/plate-ui/editor';

export default function BasicEditorStylingDemo() {
  const editor = useLateEditor();

  return (
    <Late editor={editor}>
      <Editor placeholder="Type..." />
    </Late>
  );
}
