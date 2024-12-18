'use client';

import { BasicElementsPlugin } from '@sewell_stephens/late-basic-elements/react';
import { BasicMarksPlugin } from '@sewell_stephens/late-basic-marks/react';
import { Late, useLateEditor } from '@sewell_stephens/late-common/react';

import { Label } from '@/components/ui/label';
import { LateUI } from '@/plate/demo/plate-ui';
import { Editor } from '@/registry/default/plate-ui/editor';
import { FloatingToolbar } from '@/registry/default/plate-ui/floating-toolbar';
import { FloatingToolbarButtons } from '@/registry/default/plate-ui/floating-toolbar-buttons';

export default function EditorLabel() {
  const editor = useLateEditor({
    id: 'message',
    override: { components: LateUI },
    plugins: [BasicElementsPlugin, BasicMarksPlugin],
  });

  return (
    <div className="mt-[72px] grid gap-1.5 p-10">
      <Late editor={editor}>
        <Label htmlFor="message">Your message</Label>
        <Editor id="message" placeholder="Type your message here." />

        <FloatingToolbar>
          <FloatingToolbarButtons />
        </FloatingToolbar>
      </Late>
    </div>
  );
}
