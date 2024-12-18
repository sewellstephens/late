'use client';

import { BasicElementsPlugin } from '@sewell_stephens/late-basic-elements/react';
import { BasicMarksPlugin } from '@sewell_stephens/late-basic-marks/react';
import { Late, useLateEditor } from '@sewell_stephens/late-common/react';

import { LateUI } from '@/plate/demo/plate-ui';
import { Editor } from '@/registry/default/plate-ui/editor';
import { FloatingToolbar } from '@/registry/default/plate-ui/floating-toolbar';
import { FloatingToolbarButtons } from '@/registry/default/plate-ui/floating-toolbar-buttons';

export default function EditorGhost() {
  const editor = useLateEditor({
    override: { components: LateUI },
    plugins: [BasicElementsPlugin, BasicMarksPlugin],
  });

  return (
    <div className="mt-[72px] p-10">
      <Late editor={editor}>
        <Editor placeholder="Type your message here." variant="ghost" />

        <FloatingToolbar>
          <FloatingToolbarButtons />
        </FloatingToolbar>
      </Late>
    </div>
  );
}
