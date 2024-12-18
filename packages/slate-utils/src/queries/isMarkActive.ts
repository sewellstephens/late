import type { TEditor } from '@sewell_stephens/slate';

import { isDefined } from '@sewell_stephens/utils';

import { getMark } from './getMark';

/** Is the mark defined in the selection. */
export const isMarkActive = (editor: TEditor, type: string) => {
  return isDefined(getMark(editor, type));
};
