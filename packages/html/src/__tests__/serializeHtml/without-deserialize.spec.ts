import { ParagraphPlugin } from '@sewell_stephens/late-common/react';

import { serializeHtml } from '../../react/serializeHtml';
import { createLateUIEditor } from '../create-plate-ui-editor';

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
        createLateUIEditor({
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
