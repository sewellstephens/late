import { createSlatePlugin } from '@sewell_stephens/late-common';

export const InlineEquationPlugin = createSlatePlugin({
  key: 'inline_equation',
  node: { isElement: true, isInline: true, isVoid: true },
});
