import { useEditorPlugin } from '@sewell_stephens/late-common/react';

import { findCommentNodeById } from '../../../lib';
import { CommentsPlugin } from '../../CommentsPlugin';

export const useActiveCommentNode = () => {
  const { editor, useOption } = useEditorPlugin(CommentsPlugin);

  const id = useOption('activeCommentId');

  if (!id) return null;

  return findCommentNodeById(editor, id);
};
