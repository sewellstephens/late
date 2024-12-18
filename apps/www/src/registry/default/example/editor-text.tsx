'use client';

import { BasicElementsPlugin } from '@sewellstephens/plate-basic-elements/react';
import { BasicMarksPlugin } from '@sewellstephens/plate-basic-marks/react';
import { Late, useLateEditor } from '@sewellstephens/plate-common/react';

import { Label } from '@/components/ui/label';
import { LateUI } from '@/plate/demo/plate-ui';
import { Editor } from '@/registry/default/plate-ui/editor';
import { FloatingToolbar } from '@/registry/default/plate-ui/floating-toolbar';
import { FloatingToolbarButtons } from '@/registry/default/plate-ui/floating-toolbar-buttons';

export default function EditorText() {
  const editor = useLateEditor({
    override: { components: LateUI },
    plugins: [BasicElementsPlugin, BasicMarksPlugin],
  });

  return (
    <div className="mt-[72px] grid gap-1.5 p-10">
      <Late editor={editor}>
        <Label htmlFor="message-2">Your Message</Label>
        <Editor id="message-2" placeholder="Type your message here." />

        <FloatingToolbar>
          <FloatingToolbarButtons />
        </FloatingToolbar>

        <p className="text-sm text-muted-foreground">
          Your message will be copied to the support team.
        </p>
      </Late>
    </div>
  );
}
