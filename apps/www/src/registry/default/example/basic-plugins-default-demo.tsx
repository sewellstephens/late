import React, { useState } from 'react';

import type { Value } from '@sewell_stephens/late-common';

import {
  BoldPlugin,
  CodePlugin,
  ItalicPlugin,
  StrikethroughPlugin,
  UnderlinePlugin,
} from '@sewell_stephens/late-basic-marks/react';
import { BlockquotePlugin } from '@sewell_stephens/late-block-quote/react';
import { CodeBlockPlugin } from '@sewell_stephens/late-code-block/react';
import { Late, useLateEditor } from '@sewell_stephens/late-common/react';
import { HeadingPlugin } from '@sewell_stephens/late-heading/react';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { editableProps } from '@/plate/demo/editableProps';
import { Editor } from '@/registry/default/plate-ui/editor';

import { basicEditorValue } from './basic-plugins-components-demo';

export default function BasicPluginsDefaultDemo() {
  const [debugValue, setDebugValue] = useState<Value>(basicEditorValue);
  const editor = useLateEditor({
    plugins: [
      BlockquotePlugin,
      CodeBlockPlugin,
      HeadingPlugin,
      BoldPlugin,
      ItalicPlugin,
      UnderlinePlugin,
      StrikethroughPlugin,
      CodePlugin,
    ],
    value: basicEditorValue,
  });

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
