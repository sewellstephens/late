import {
  type SlateEditor,
  isExpanded,
  isText,
  nanoid,
  setNodes,
} from '@sewellstephens/plate-common';
import { deselectEditor } from '@sewellstephens/plate-common/react';

import { CommentsPlugin, getCommentKey } from '../../lib';

export const insertComment = (editor: SlateEditor) => {
  const { selection } = editor;

  if (!isExpanded(selection)) return;

  const id = nanoid();

  // add comment prop to inline elements
  // const entries = getNodes(editor, {
  //   // TODO
  // });
  //
  // Array.from(entries).forEach(([, path]) => {
  //   setNodes(
  //     editor,
  //     {
  //       [key]: comment,
  //     },
  //     { at: path }
  //   );
  // });

  setNodes(
    editor,
    { [CommentsPlugin.key]: true, [getCommentKey(id)]: true },
    { match: isText, split: true }
  );

  try {
    deselectEditor(editor);
  } catch {}

  setTimeout(() => {
    editor.setOption(CommentsPlugin, 'activeCommentId', id);
  }, 0);
};
