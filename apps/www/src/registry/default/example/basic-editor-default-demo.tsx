import React from 'react';

import {
  Late,
  LateContent,
  useLateEditor,
} from '@sewellstephens/plate-common/react';

export default function BasicEditorDefaultDemo() {
  const editor = useLateEditor();

  return (
    <Late editor={editor}>
      <LateContent placeholder="Type..." />
    </Late>
  );
}
