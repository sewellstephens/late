import React from 'react';

import { type CreateLateEditorOptions, createLateEditor } from '../editor';
import { Late, type LateProps } from './Late';
import { LateContent, type LateContentProps } from './LateContent';

export function LateTest({
  editableProps,
  shouldNormalizeEditor,
  variant = 'wordProcessor',
  ...props
}: {
  editableProps?: LateContentProps;
  variant?: 'comment' | 'wordProcessor';
} & CreateLateEditorOptions &
  LateProps) {
  const { editor: _editor, id, plugins } = props;

  let editor = _editor;

  if (editor && !editor.pluginList) {
    editor = createLateEditor({
      editor,
      id,
      plugins,
      shouldNormalizeEditor,
    });
  }

  return (
    <Late {...props} editor={editor}>
      <LateContent
        autoFocus
        data-testid="slate-content-editable"
        data-variant={variant}
        {...editableProps}
      />
    </Late>
  );
}
