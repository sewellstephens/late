import React, { useState } from 'react';

import type { Value } from '@sewellstephens/plate-common';

import {
  BoldPlugin,
  CodePlugin,
  ItalicPlugin,
  StrikethroughPlugin,
  UnderlinePlugin,
} from '@sewellstephens/plate-basic-marks/react';
import { BlockquotePlugin } from '@sewellstephens/plate-block-quote/react';
import { CodeBlockPlugin } from '@sewellstephens/plate-code-block/react';
import { Plate, usePlateEditor } from '@sewellstephens/plate-common/react';
import { HeadingPlugin } from '@sewellstephens/plate-heading/react';

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
  const editor = usePlateEditor({
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
    <Plate
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
    </Plate>
  );
}
