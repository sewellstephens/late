import React from 'react';

import {
  createPrimitiveComponent,
  useEditorPlugin,
} from '@sewell_stephens/late-common/react';

import { CommentsPlugin } from '../CommentsPlugin';

export const useCommentNewTextareaState = () => {
  const { setOption, useOption } = useEditorPlugin(CommentsPlugin);

  const activeComment = useOption('activeComment');
  const value = useOption('newText');
  const focusTextarea = useOption('focusTextarea');

  const textareaRef = React.useRef<HTMLTextAreaElement | null>(null);

  React.useEffect(() => {
    if (focusTextarea) {
      textareaRef.current?.focus();
      setOption('focusTextarea', false);
    }
  }, [focusTextarea, setOption, textareaRef]);

  const placeholder = `${activeComment ? 'Reply...' : 'Add a comment...'}`;

  return {
    placeholder,
    setOption,
    textareaRef,
    value,
  };
};

export const useCommentNewTextarea = ({
  placeholder,
  setOption,
  textareaRef,
  value,
}: ReturnType<typeof useCommentNewTextareaState>) => {
  return {
    props: {
      onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setOption('newValue', [
          { children: [{ text: event.target.value }], type: 'p' },
        ]);
      },
      placeholder,
      ref: textareaRef,
      rows: 1,
      value: value ?? undefined,
    },
  };
};

export const CommentNewTextarea = createPrimitiveComponent('textarea')({
  propsHook: useCommentNewTextarea,
  stateHook: useCommentNewTextareaState,
});
