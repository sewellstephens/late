import { BlockquotePlugin } from '@sewell_stephens/late-block-quote/react';
import {
  CodeBlockPlugin,
  isCodeBlockEmpty,
  isSelectionAtCodeBlockStart,
  unwrapCodeBlock,
} from '@sewell_stephens/late-code-block';
import {
  ParagraphPlugin,
  isBlockAboveEmpty,
  isSelectionAtBlockStart,
} from '@sewell_stephens/late-common';
import { TodoListPlugin } from '@sewell_stephens/late-list/react';
import { ResetNodePlugin } from '@sewell_stephens/late-reset-node';

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
