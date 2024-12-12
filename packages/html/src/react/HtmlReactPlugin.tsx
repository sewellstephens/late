import { bindFirst } from '@sewellstephens/plate-common';
import { createPlatePlugin } from '@sewellstephens/plate-common/react';

import { serializeHtml } from './serializeHtml';

export const HtmlReactPlugin = createPlatePlugin({
  key: 'htmlReact',
}).extendApi(({ editor }) => ({
  serialize: bindFirst(serializeHtml, editor),
}));
