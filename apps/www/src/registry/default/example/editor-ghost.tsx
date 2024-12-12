'use client';

import { BasicElementsPlugin } from '@sewellstephens/plate-basic-elements/react';
import { BasicMarksPlugin } from '@sewellstephens/plate-basic-marks/react';
import { Plate, usePlateEditor } from '@sewellstephens/plate-common/react';

import { PlateUI } from '@/plate/demo/plate-ui';
import { Editor } from '@/registry/default/plate-ui/editor';
import { FloatingToolbar } from '@/registry/default/plate-ui/floating-toolbar';
import { FloatingToolbarButtons } from '@/registry/default/plate-ui/floating-toolbar-buttons';

export default function EditorGhost() {
  const editor = usePlateEditor({
    override: { components: PlateUI },
    plugins: [BasicElementsPlugin, BasicMarksPlugin],
  });

  return (
    <div className="mt-[72px] p-10">
      <Plate editor={editor}>
        <Editor placeholder="Type your message here." variant="ghost" />

        <FloatingToolbar>
          <FloatingToolbarButtons />
        </FloatingToolbar>
      </Plate>
    </div>
  );
}
