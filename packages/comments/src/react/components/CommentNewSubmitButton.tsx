import { nanoid } from '@sewell_stephens/late-common';
import {
  createPrimitiveComponent,
  useEditorPlugin,
} from '@sewell_stephens/late-common/react';

import { CommentsPlugin } from '../CommentsPlugin';
import {
  SCOPE_ACTIVE_COMMENT,
  useComment,
} from '../stores/comment/CommentProvider';

export const useCommentNewSubmitButtonState = () => {
  const { api, getOptions, useOption } = useEditorPlugin(CommentsPlugin);
  const newText = useOption('newText');

  const comment = useComment(SCOPE_ACTIVE_COMMENT)!;

  const isReplyComment = !!comment;

  const submitButtonText = isReplyComment ? 'Reply' : 'Comment';

  return {
    api,
    comment,
    getOptions,
    isReplyComment,
    newText,
    submitButtonText,
  };
};

export const useCommentNewSubmitButton = ({
  api,
  comment,
  getOptions,
  isReplyComment,
  newText,
  submitButtonText,
}: ReturnType<typeof useCommentNewSubmitButtonState>) => {
  return {
    props: {
      children: submitButtonText,
      disabled: !newText?.trim().length,
      onClick: () => {
        const { activeCommentId, newValue, onCommentAdd } = getOptions();

        const newComment = api.comment.addComment(
          isReplyComment
            ? {
                id: nanoid(),
                parentId: comment.id,
                value: newValue,
              }
            : {
                id: activeCommentId!,
                value: newValue,
              }
        );

        onCommentAdd?.(newComment);

        api.comment.resetNewCommentValue();
      },
      type: 'submit',
    },
  };
};

export const CommentNewSubmitButton = createPrimitiveComponent('button')({
  propsHook: useCommentNewSubmitButton,
  stateHook: useCommentNewSubmitButtonState,
});
