/** @jsx jsx */

import type { SlateEditor } from '@sewellstephens/plate-common';

import { createSlateEditor } from '@sewellstephens/plate-common';
import { jsx } from '@sewellstephens/plate-test-utils';

import { AlignPlugin } from '../../AlignPlugin';
import { setAlign } from '../../transforms';

jsx;

const input = (
  <editor>
    <hp align="center">
      test
      <cursor />
    </hp>
  </editor>
) as any as SlateEditor;

const output = (
  <editor>
    <hp>test</hp>
  </editor>
) as any as SlateEditor;

it('should remove align prop', () => {
  const editor = createSlateEditor({
    editor: input,
    plugins: [AlignPlugin],
  });

  setAlign(editor, { value: 'start' });

  expect(editor.children).toEqual(output.children);
});
