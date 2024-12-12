/** @jsx jsx */

import { createSlateEditor } from '@sewellstephens/plate-common';
import { HEADING_KEYS } from '@sewellstephens/plate-heading';
import { jsx } from '@sewellstephens/plate-test-utils';

import { NormalizeTypesPlugin } from '../../../lib/NormalizeTypesPlugin';

jsx;

const input = (
  <editor>
    <hh2>test</hh2>
    <hh2>test</hh2>
    <hh2>test</hh2>
  </editor>
) as any;

const output = (
  <editor>
    <hh2>test</hh2>
    <hh2>test</hh2>
    <hh2>test</hh2>
  </editor>
) as any;

it('should be', () => {
  const editor = createSlateEditor({
    editor: input,
    plugins: [
      NormalizeTypesPlugin.configure({
        options: {
          rules: [{ path: [0], type: HEADING_KEYS.h1 }],
        },
      }),
    ],
  });

  editor.normalizeNode([input, []]);

  expect(input.children).toEqual(output.children);
});
