import { createSlatePlugin } from '@sewellstephens/plate-common';

import 'katex/dist/katex.min.css';

export const EquationPlugin = createSlatePlugin({
  key: 'equation',
  node: { isElement: true, isVoid: true },
});
