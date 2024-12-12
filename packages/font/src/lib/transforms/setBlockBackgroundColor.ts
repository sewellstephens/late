import {
  type SlateEditor,
  type TNodeEntry,
  setNodes,
} from '@sewellstephens/plate-common';

import { FontBackgroundColorPlugin } from '../FontBackgroundColorPlugin';

export const setBlockBackgroundColor = (
  editor: SlateEditor,
  block: TNodeEntry,
  backgroundColor: string
) => {
  setNodes(
    editor,
    { [FontBackgroundColorPlugin.key]: backgroundColor },
    { at: block[1] }
  );
};
