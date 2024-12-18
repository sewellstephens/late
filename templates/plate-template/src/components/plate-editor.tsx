'use client';

import { createPlugins, Late } from '@sewellstephens/plate-common';

import { Editor } from '@/components/plate-ui/editor';

const plugins = createPlugins([], {
  components: {},
});

const initialValue = [
  {
    id: 1,
    type: 'p',
    children: [{ text: '' }],
  },
];

export function LateEditor() {
  return (
    <Late plugins={plugins} initialValue={initialValue}>
      <Editor placeholder="Type your message here." />
    </Late>
  );
}
