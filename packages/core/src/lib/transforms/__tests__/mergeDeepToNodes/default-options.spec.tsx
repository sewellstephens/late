/** @jsx jsx */

import type { TNode } from '@sewellstephens/slate';

import { jsx } from '@sewellstephens/plate-test-utils';

import type { SlateEditor } from '../../../editor';

import { mergeDeepToNodes } from '../../../utils';

jsx;

const editor = (
  <editor>
    <hp>test</hp>
  </editor>
) as any as SlateEditor;

const props = { a: 1 };

const output = (
  <editor a={1}>
    <hp a={1}>
      <htext a={1}>test</htext>
    </hp>
  </editor>
) as any;

it('should do nothing', () => {
  mergeDeepToNodes<TNode>({ node: editor as any, source: props });
  expect(editor.a).toBe(1);
  expect(editor.children).toEqual(output.children);
});
