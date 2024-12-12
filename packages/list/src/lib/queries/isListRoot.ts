import {
  type SlateEditor,
  type TDescendant,
  isElement,
} from '@sewellstephens/plate-common';

import { getListTypes } from './getListTypes';

export const isListRoot = (editor: SlateEditor, node: TDescendant): boolean =>
  isElement(node) && getListTypes(editor).includes(node.type);
