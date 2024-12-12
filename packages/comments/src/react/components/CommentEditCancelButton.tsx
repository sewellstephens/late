import { createPrimitiveComponent } from '@sewellstephens/plate-common/react';

import { useCommentActions } from '../stores/comment/CommentProvider';

export const useCommentEditCancelButton = () => {
  const setEditingValue = useCommentActions().editingValue();

  return {
    props: {
      onClick: () => {
        setEditingValue(null);
      },
    },
  };
};

export const CommentEditCancelButton = createPrimitiveComponent('button')({
  propsHook: useCommentEditCancelButton,
});