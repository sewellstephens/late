import React, { useState } from 'react';

import type { Value } from '@sewell_stephens/late-common';

import { Late, useLateEditor } from '@sewell_stephens/late-common/react';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { editableProps } from '@/plate/demo/editableProps';
import { Editor } from '@/registry/default/plate-ui/editor';

const value = [
  {
    children: [
      {
        text: 'This is editable plain text with react and history plugins, just like a textarea!',
      },
    ],
    type: 'p',
  },
];

export default function BasicEditorHandlerDemo() {
  const [debugValue, setDebugValue] = useState<Value>(value);
  const editor = useLateEditor({ value });

  return (
    <Late
      editor={editor}
      onChange={({ value }) => {
        setDebugValue(value);
        // save newValue...
      }}
    >
      <Editor {...editableProps} />

      <Accordion collapsible type="single">
        <AccordionItem value="manual-installation">
          <AccordionTrigger>Debug Value</AccordionTrigger>
          <AccordionContent>{JSON.stringify(debugValue)}</AccordionContent>
        </AccordionItem>
      </Accordion>
    </Late>
  );
}
