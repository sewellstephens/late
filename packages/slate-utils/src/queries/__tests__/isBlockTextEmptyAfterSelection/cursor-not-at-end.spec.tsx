/** @jsx jsx */

import type { SlateEditor } from '@sewellstephens/plate-common';

import { createLateEditor } from '@sewellstephens/plate-common/react';
import { LinkPlugin } from '@sewellstephens/plate-link';
import { jsx } from '@sewellstephens/plate-test-utils';

import { isBlockTextEmptyAfterSelection } from '../../isBlockTextEmptyAfterSelection';

jsx;

const input = (
  <editor>
    <hp>
      <htext>first</htext>
      <ha>
        tes
        <cursor />t
      </ha>
      <htext />
    </hp>
  </editor>
) as any as SlateEditor;

const output = false;

it('should be', () => {
  const editor = createLateEditor({
    editor: input,
    plugins: [LinkPlugin],
  });

  expect(isBlockTextEmptyAfterSelection(editor)).toEqual(output);
});
