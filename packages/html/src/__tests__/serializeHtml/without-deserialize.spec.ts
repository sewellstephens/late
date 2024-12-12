import { ParagraphPlugin } from '@sewellstephens/plate-common/react';

import { serializeHtml } from '../../react/serializeHtml';
import { createPlateUIEditor } from '../create-plate-ui-editor';

describe('when there is no deserializer', () => {
  it('not serialize', () => {
    const plugin = ParagraphPlugin.extend({
      parsers: {
        htmlReact: {
          serializer: null,
        },
      },
    });

    expect(
      serializeHtml(
        createPlateUIEditor({
          plugins: [plugin],
        }),
        {
          nodes: [
            {
              children: [{ text: 'I am centered text!' }],
              type: ParagraphPlugin.key,
            },
          ],
        }
      )
    ).toBe('<div>I am centered text!</div>');
  });
});
