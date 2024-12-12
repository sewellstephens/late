import type { TEditor } from '@sewellstephens/slate';

import { isDefined } from '@sewellstephens/utils';

import { getMark } from './getMark';

/** Is the mark defined in the selection. */
export const isMarkActive = (editor: TEditor, type: string) => {
  return isDefined(getMark(editor, type));
};
