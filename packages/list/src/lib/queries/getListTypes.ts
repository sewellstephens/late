import type { SlateEditor } from '@sewell_stephens/late-common';

import { BulletedListPlugin, NumberedListPlugin } from '../ListPlugin';

export const getListTypes = (editor: SlateEditor) => {
  return [
    editor.getType(NumberedListPlugin),
    editor.getType(BulletedListPlugin),
  ];
};
