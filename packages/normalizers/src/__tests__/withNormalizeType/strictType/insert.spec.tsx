/** @jsx jsx */

import { createSlateEditor } from '@sewellstephens/plate-common';
import { HEADING_KEYS } from '@sewellstephens/plate-heading';
import { jsx } from '@sewellstephens/plate-test-utils';

import { NormalizeTypesPlugin } from '../../../lib/NormalizeTypesPlugin';

jsx;

const input = (
  <editor>
    <hh1>test</hh1>
  </editor>
) as any;

const output = (
  <editor>
    <hh1>test</hh1>
    <hh2>
      <htext />
    </hh2>
  </editor>
) as any;

it('should be', () => {
  const editor = createSlateEditor({
    editor: input,
    plugins: [
      NormalizeTypesPlugin.configure({
        options: {
          rules: [{ path: [1], strictType: HEADING_KEYS.h2 }],
        },
      }),
    ],
  });

  editor.normalizeNode([input, []]);

  expect(input.children).toEqual(output.children);
});
