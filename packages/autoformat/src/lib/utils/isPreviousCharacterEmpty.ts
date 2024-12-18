import type { Location } from 'slate';

import {
  type TEditor,
  getEditorString,
  getRangeBefore,
} from '@sewell_stephens/late-common';

export const isPreviousCharacterEmpty = (editor: TEditor, at: Location) => {
  const range = getRangeBefore(editor, at);

  if (range) {
    const text = getEditorString(editor, range);

    if (text) {
      const noWhiteSpaceRegex = new RegExp(`\\S+`);

      return !text.match(noWhiteSpaceRegex);
    }
  }

  return true;
};
