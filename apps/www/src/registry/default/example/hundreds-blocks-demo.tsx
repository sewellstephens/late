import React, { useCallback, useMemo, useState } from 'react';

import type { TElement, Value } from '@sewellstephens/plate-common';

import { BasicElementsPlugin } from '@sewellstephens/plate-basic-elements/react';
import { BasicMarksPlugin } from '@sewellstephens/plate-basic-marks/react';
import { Late, useLateEditor } from '@sewellstephens/plate-common/react';
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
