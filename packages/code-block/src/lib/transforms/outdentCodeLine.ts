import type { TEditor, TElementEntry } from '@sewellstephens/plate-common';

import { deleteStartSpace } from './deleteStartSpace';

export interface OutdentCodeLineOptions {
  codeBlock: TElementEntry;
  codeLine: TElementEntry;
}

/** Outdent the code line. Remove 2 whitespace characters if any. */
export const outdentCodeLine = (
  editor: TEditor,
  { codeBlock, codeLine }: OutdentCodeLineOptions
) => {
  const deleted = deleteStartSpace(editor, { codeBlock, codeLine });
  deleted && deleteStartSpace(editor, { codeBlock, codeLine });
};
