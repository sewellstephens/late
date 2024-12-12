import { BlockquotePlugin } from '@sewellstephens/plate-block-quote/react';
import {
  CodeBlockPlugin,
  isCodeBlockEmpty,
  isSelectionAtCodeBlockStart,
  unwrapCodeBlock,
} from '@sewellstephens/plate-code-block';
import {
  ParagraphPlugin,
  isBlockAboveEmpty,
  isSelectionAtBlockStart,
} from '@sewellstephens/plate-common';
import { TodoListPlugin } from '@sewellstephens/plate-list/react';
import { ResetNodePlugin } from '@sewellstephens/plate-reset-node';

const resetBlockTypesCommonRule = {
  defaultType: ParagraphPlugin.key,
  types: [BlockquotePlugin.key, TodoListPlugin.key],
};

const resetBlockTypesCodeBlockRule = {
  defaultType: ParagraphPlugin.key,
  onReset: unwrapCodeBlock,
  types: [CodeBlockPlugin.key],
};

export const resetBlockTypePlugin = ResetNodePlugin.configure({
  options: {
    rules: [
      {
        ...resetBlockTypesCommonRule,
        hotkey: 'Enter',
        predicate: isBlockAboveEmpty,
      },
      {
        ...resetBlockTypesCommonRule,
        hotkey: 'Backspace',
        predicate: isSelectionAtBlockStart,
      },
      {
        ...resetBlockTypesCodeBlockRule,
        hotkey: 'Enter',
        predicate: isCodeBlockEmpty,
      },
      {
        ...resetBlockTypesCodeBlockRule,
        hotkey: 'Backspace',
        predicate: isSelectionAtCodeBlockStart,
      },
    ],
  },
});
