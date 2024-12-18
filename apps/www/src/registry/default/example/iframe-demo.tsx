import React, { useState } from 'react';
import { createPortal } from 'react-dom';

import { BasicElementsPlugin } from '@sewellstephens/plate-basic-elements/react';
import { BasicMarksPlugin } from '@sewellstephens/plate-basic-marks/react';
import { Late, useLateEditor } from '@sewellstephens/plate-common/react';

import { editableProps } from '@/plate/demo/editableProps';
import { LateUI } from '@/plate/demo/plate-ui';
import { iframeValue } from '@/plate/demo/values/iframeValue';
import { Editor } from '@/registry/default/plate-ui/editor';

import { EditableVoidPlugin } from './editable-voids-demo';

export function IFrame({ children, ...props }: any) {
  const [contentRef, setContentRef] = useState<any>(null);
  const mountNode = contentRef?.contentWindow?.document.body;

  return (
    // eslint-disable-next-line jsx-a11y/iframe-has-title
    <iframe {...props} ref={setContentRef}>
      {mountNode && createPortal(React.Children.only(children), mountNode)}
    </iframe>
  );
}

export default function IframeDemo() {
  const editor = useLateEditor({
    override: { components: LateUI },
    plugins: [BasicElementsPlugin, BasicMarksPlugin, EditableVoidPlugin],
    value: iframeValue,
  });

  return (
    <IFrame className="p-10">
      <Late editor={editor}>
        <Editor {...editableProps} />
      </Late>
    </IFrame>
  );
}
