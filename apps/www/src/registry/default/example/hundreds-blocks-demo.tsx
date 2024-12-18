import React, { useCallback, useMemo, useState } from 'react';

import type { TElement, Value } from '@sewell_stephens/late-common';

import { BasicElementsPlugin } from '@sewell_stephens/late-basic-elements/react';
import { BasicMarksPlugin } from '@sewell_stephens/late-basic-marks/react';
import { Late, useLateEditor } from '@sewell_stephens/late-common/react';
import { createEditor } from 'slate';
import {
  Editable,
  type ReactEditor,
  type RenderElementProps,
  Slate,
  withReact,
} from 'slate-react';

import { editableProps } from '@/plate/demo/editableProps';
import { LateUI } from '@/plate/demo/plate-ui';
import { createHugeDocumentValue } from '@/plate/demo/values/createHugeDocumentValue';
import { Editor } from '@/registry/default/plate-ui/editor';

const value = createHugeDocumentValue();

function WithLate() {
  const editor = useLateEditor({
    override: { components: LateUI },
    plugins: [BasicElementsPlugin, BasicMarksPlugin],
    value,
  });

  return (
    <Late editor={editor}>
      <Editor {...editableProps} />
    </Late>
  );
}

function Element({ attributes, children, element }: RenderElementProps) {
  switch ((element as TElement).type) {
    case 'h1': {
      return <h1 {...attributes}>{children}</h1>;
    }
    default: {
      return <p {...attributes}>{children}</p>;
    }
  }
}

function WithoutLate() {
  const [initialValue, setValue] = useState(value);
  const renderElement = useCallback((p: any) => <Element {...p} />, []);
  const editor = useMemo(() => withReact(createEditor() as ReactEditor), []);
  const onChange = useCallback((newValue: Value) => setValue(newValue), []);

  return (
    <Slate
      editor={editor}
      initialValue={initialValue}
      onChange={onChange as any}
    >
      <Editable renderElement={renderElement} {...(editableProps as any)} />
    </Slate>
  );
}

export default function HundredsBlocksDemo() {
  return (
    <div className="flex">
      <div className="w-1/2 p-4">
        <WithLate />
      </div>
      <div className="w-1/2 p-4">
        <WithoutLate />
      </div>
    </div>
  );
}
