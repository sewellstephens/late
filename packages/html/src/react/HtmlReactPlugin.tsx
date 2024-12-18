import { bindFirst } from '@sewell_stephens/late-common';
import { createLatePlugin } from '@sewell_stephens/late-common/react';

import { serializeHtml } from './serializeHtml';

export const HtmlReactPlugin = createLatePlugin({
  key: 'htmlReact',
}).extendApi(({ editor }) => ({
  serialize: bindFirst(serializeHtml, editor),
}));
