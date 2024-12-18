'use client';

import { Late, useLateEditor } from '@sewellstephens/plate-common/react';

import { Editor } from '@/registry/default/plate-ui/editor';

export default function EditorDisabled() {
  const editor = useLateEditor();

  return (
    <div className="mt-[72px] p-10">
      <Late editor={editor}>
        <Editor disabled placeholder="Type your message here." />
      </Late>
    </div>
  );
}
