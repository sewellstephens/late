/** @jsx jsx */
import { type SlateEditor, createSlateEditor } from '@sewellstephens/plate-core';
import { jsx } from '@sewellstephens/plate-test-utils';
import { isType } from '@sewellstephens/plate-utils';

jsx;

const editor = (
  <editor>
    <hp>test</hp>
  </editor>
) as any as SlateEditor;

it('should return true when type matches', () => {
  expect(
    isType(createSlateEditor({ editor }), editor.children[0], 'p')
  ).toEqual(true);
});
