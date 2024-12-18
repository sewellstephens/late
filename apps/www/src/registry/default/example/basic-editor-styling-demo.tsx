import React from 'react';

import { Late, useLateEditor } from '@sewell_stephens/late-common/react';

import { Editor } from '@/registry/default/plate-ui/editor';

export default function BasicEditorStylingDemo() {
  const editor = useLateEditor();

  return (
    <Late editor={editor}>
      <Editor placeholder="Type..." />
    </Late>
  );
}
