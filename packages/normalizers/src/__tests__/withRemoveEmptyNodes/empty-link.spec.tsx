/** @jsx jsx */

import type { SlateEditor } from '@sewell_stephens/late-common';

import { createSlateEditor } from '@sewell_stephens/late-common';
import { LinkPlugin } from '@sewell_stephens/late-link';
import { jsx } from '@sewell_stephens/late-test-utils';

import { RemoveEmptyNodesPlugin } from '../../lib/RemoveEmptyNodesPlugin';

jsx;

const input = (
  <editor>
    <hp>
      <ha url="http://google.com">
        <htext />
      </ha>
      <cursor />
    </hp>
  </editor>
) as any as SlateEditor;

const output = (
  <editor>
    <hp>
      <htext />
    </hp>
  </editor>
) as any;

it('should be', () => {
  const editor = createSlateEditor({
    editor: input,
    plugins: [
      RemoveEmptyNodesPlugin.configure({
        options: {
          types: LinkPlugin.key,
        },
      }),
    ],
  });

  editor.normalizeNode([(input.children[0] as any).children[0], [0, 0]]);

  expect(input.children).toEqual(output.children);
});
