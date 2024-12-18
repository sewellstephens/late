import { createSlatePlugin } from '@sewell_stephens/late-common';

import 'katex/dist/katex.min.css';

export const EquationPlugin = createSlatePlugin({
  key: 'equation',
  node: { isElement: true, isVoid: true },
});
