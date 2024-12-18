import React from 'react';

import {
  createPrimitiveComponent,
  useEditorPlugin,
} from '@sewell_stephens/late-common/react';

import { CommentsPlugin } from '../CommentsPlugin';
import {
  useCommentActions,
  useCommentSelectors,
  useCommentText,
} from '../stores/comment/CommentProvider';

export const useCommentEditSaveButtonState = () => {
  const { api, getOptions, setOption } = useEditorPlugin(CommentsPlugin);

  const id = useCommentSelectors().id();
  const editingValue = useCommentSelectors().editingValue();
  const setEditingValue = useCommentActions().editingValue();
  const value = useCommentText();

  return {
    api,
    editingValue,
    getOptions,
    id,
    setEditingValue,
    setOption,
    value,
  };
};

export const useCommentEditSaveButton = ({
  api,
  editingValue,
  getOptions,
  id,
  setEditingValue,
  value,
}: ReturnType<typeof useCommentEditSaveButtonState>) => {
  return {
    props: {
      disabled: value?.trim().length === 0,
      onClick: React.useCallback(() => {
        if (!editingValue) return;

        api.comment.updateComment(id, {
          value: editingValue,
        });

        setEditingValue(null);

        getOptions().onCommentUpdate?.({ id, value: editingValue });
      }, [api.comment, editingValue, getOptions, id, setEditingValue]),
    },
  };
};

export const CommentEditSaveButton = createPrimitiveComponent('button')({
  propsHook: useCommentEditSaveButton,
  stateHook: useCommentEditSaveButtonState,
});
