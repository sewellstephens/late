import type { KeyboardHandler } from '@sewell_stephens/late-common/react';

import {
  type TElement,
  getBlockAbove,
  isBlockAboveEmpty,
  isHotkey,
} from '@sewell_stephens/late-common';

import { outdentList } from '../lib';
import { type IndentListConfig, IndentListPlugin } from './IndentListPlugin';

export const onKeyDownIndentList: KeyboardHandler<IndentListConfig> = ({
  editor,
  event,
}) => {
  if (event.defaultPrevented) return;
  if (!editor.selection) return;

  const entry = getBlockAbove(editor);

  if (!entry) return;

  const node = entry[0] as TElement;

  const listStyleType = node[IndentListPlugin.key] as string | undefined;

  if (!listStyleType) return;
  if (isHotkey('Enter', event) && isBlockAboveEmpty(editor) && node.indent) {
    outdentList(editor);
    event.stopPropagation();
    event.preventDefault();
  }
};
