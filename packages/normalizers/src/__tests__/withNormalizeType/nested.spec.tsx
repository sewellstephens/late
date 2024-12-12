/** @jsx jsx */

import { ParagraphPlugin } from '@sewellstephens/plate-common';
import { createSlateEditor } from '@sewellstephens/plate-common';
import { HEADING_KEYS } from '@sewellstephens/plate-heading';
import { jsx } from '@sewellstephens/plate-test-utils';

import { NormalizeTypesPlugin } from '../../lib/NormalizeTypesPlugin';

jsx;

const input = (
  <editor>
    <element />
  </editor>
) as any;

const output = (
  <editor>
    <element>
      <hh1>
        <htext />
      </hh1>
      <hp>
        <htext />
      </hp>
    </element>
  </editor>
) as any;

it('should be', () => {
  const editor = createSlateEditor({
    editor: input,
    plugins: [
      NormalizeTypesPlugin.configure({
        options: {
          rules: [
            {
              path: [0, 0],
              strictType: HEADING_KEYS.h1,
            },
            { path: [0, 1], type: ParagraphPlugin.key },
          ],
        },
      }),
    ],
  });

  editor.normalizeNode([input, []]);

  expect(input.children).toEqual(output.children);
});
