import { bindFirst } from '@sewellstephens/plate-common';
import { createLatePlugin } from '@sewellstephens/plate-common/react';

import { serializeHtml } from './serializeHtml';

export const HtmlReactPlugin = createLatePlugin({
  key: 'htmlReact',
}).extendApi(({ editor }) => ({
  serialize: bindFirst(serializeHtml, editor),
}));
