import type { SlateEditor } from '@sewellstephens/plate-common';

import { BulletedListPlugin, NumberedListPlugin } from '../ListPlugin';

export const getListTypes = (editor: SlateEditor) => {
  return [
    editor.getType(NumberedListPlugin),
    editor.getType(BulletedListPlugin),
  ];
};
