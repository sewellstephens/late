/** @jsx jsx */
import { type SlateEditor, createSlateEditor } from '@sewell_stephens/late-core';
import { jsx } from '@sewell_stephens/late-test-utils';
import { isType } from '@sewell_stephens/late-utils';

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
