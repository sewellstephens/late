import { Key, toPlatePlugin } from '@sewellstephens/plate-common/react';

import {
  CodeBlockPlugin as BaseCodeBlockPlugin,
  CodeLinePlugin as BaseCodeLinePlugin,
  CodeSyntaxPlugin as BaseCodeSyntaxPlugin,
} from '../lib/CodeBlockPlugin';
import { onKeyDownCodeBlock } from './onKeyDownCodeBlock';

export const CodeLinePlugin = toPlatePlugin(BaseCodeLinePlugin);

export const CodeSyntaxPlugin = toPlatePlugin(BaseCodeSyntaxPlugin);

/** Enables support for pre-formatted code blocks. */
export const CodeBlockPlugin = toPlatePlugin(BaseCodeBlockPlugin, {
  handlers: {
    onKeyDown: onKeyDownCodeBlock,
  },
  plugins: [CodeLinePlugin, CodeSyntaxPlugin],
}).extend(({ editor, type }) => ({
  shortcuts: {
    toggleCodeBlock: {
      handler: () => {
        editor.tf.toggle.block({ type });
      },
      keys: [[Key.Mod, Key.Alt, '8']],
      preventDefault: true,
    },
  },
}));
