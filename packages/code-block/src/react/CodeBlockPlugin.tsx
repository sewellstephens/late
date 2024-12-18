import { Key, toLatePlugin } from '@sewell_stephens/late-common/react';

import {
  CodeBlockPlugin as BaseCodeBlockPlugin,
  CodeLinePlugin as BaseCodeLinePlugin,
  CodeSyntaxPlugin as BaseCodeSyntaxPlugin,
} from '../lib/CodeBlockPlugin';
import { onKeyDownCodeBlock } from './onKeyDownCodeBlock';

export const CodeLinePlugin = toLatePlugin(BaseCodeLinePlugin);

export const CodeSyntaxPlugin = toLatePlugin(BaseCodeSyntaxPlugin);

/** Enables support for pre-formatted code blocks. */
export const CodeBlockPlugin = toLatePlugin(BaseCodeBlockPlugin, {
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
