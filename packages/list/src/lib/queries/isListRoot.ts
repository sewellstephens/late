import {
  type SlateEditor,
  type TDescendant,
  isElement,
} from '@sewell_stephens/late-common';

import { getListTypes } from './getListTypes';

export const isListRoot = (editor: SlateEditor, node: TDescendant): boolean =>
  isElement(node) && getListTypes(editor).includes(node.type);
