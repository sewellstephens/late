import type { Path } from 'slate';

import { type TEditor, getNode, isText } from '@sewellstephens/slate';

export const isTextByPath = (editor: TEditor, path: Path) => {
  const node = getNode(editor, path);

  return isText(node);
};
