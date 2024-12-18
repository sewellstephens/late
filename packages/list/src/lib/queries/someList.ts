import type { SlateEditor } from '@sewell_stephens/late-common';

import { getListItemEntry } from '../index';

export const someList = (editor: SlateEditor, type: string) => {
  return getListItemEntry(editor)?.list?.[0].type === type;
};
