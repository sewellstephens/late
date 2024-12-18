import React from 'react';

import type { TEditableProps } from '@sewell_stephens/slate-react';

import type { LateEditor } from '../editor/LateEditor';

import { LateStoreProvider, type LateStoreState } from '../stores';

export interface LateProps<E extends LateEditor = LateEditor>
  extends Partial<
    Pick<
      LateStoreState<E>,
      | 'decorate'
      | 'onChange'
      | 'onSelectionChange'
      | 'onValueChange'
      | 'primary'
      | 'readOnly'
    >
  > {
  children: React.ReactNode;

  editor: E | null;

  renderElement?: TEditableProps['renderElement'];

  renderLeaf?: TEditableProps['renderLeaf'];
}

function LateInner({
  children,
  decorate,
  editor,
  onChange,
  onSelectionChange,
  onValueChange,
  primary,
  readOnly,
  renderElement,
  renderLeaf,
}: LateProps) {
  return (
    <LateStoreProvider
      decorate={decorate}
      editor={editor!}
      onChange={onChange}
      onSelectionChange={onSelectionChange}
      onValueChange={onValueChange}
      primary={primary}
      readOnly={readOnly}
      renderElement={renderElement}
      renderLeaf={renderLeaf}
      scope={editor!.id}
    >
      {children}
    </LateStoreProvider>
  );
}

export function Late<E extends LateEditor = LateEditor>(
  props: LateProps<E>
) {
  if (!props.editor) return null;

  return <LateInner key={props.editor.key} {...(props as any)} />;
}
