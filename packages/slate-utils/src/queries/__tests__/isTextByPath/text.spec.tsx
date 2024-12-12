/** @jsx jsx */

import type { SlateEditor } from '@sewellstephens/plate-core';

import { jsx } from '@sewellstephens/plate-test-utils';

import { isTextByPath } from '../../isTextByPath';

jsx;

const editor = (
  <editor>
    <hp>test</hp>
  </editor>
) as any as SlateEditor;

const path = [0, 0];

const output = true;

it('should be', () => {
  expect(isTextByPath(editor, path)).toEqual(output);
});
