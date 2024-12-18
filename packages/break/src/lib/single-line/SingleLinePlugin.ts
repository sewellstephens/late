import { createSlatePlugin } from '@sewell_stephens/late-common';

import { withSingleLine } from './withSingleLine';

/** Forces editor to only have one line. */
export const SingleLinePlugin = createSlatePlugin({
  extendEditor: withSingleLine,
  key: 'singleLine',
});
