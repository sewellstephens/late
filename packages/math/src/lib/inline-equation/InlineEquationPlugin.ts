import { createSlatePlugin } from '@sewellstephens/plate-common';

export const InlineEquationPlugin = createSlatePlugin({
  key: 'inline_equation',
  node: { isElement: true, isInline: true, isVoid: true },
});
