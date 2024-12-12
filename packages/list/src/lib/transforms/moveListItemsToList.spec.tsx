/** @jsx jsx */

import {
  type SlateEditor,
  createSlateEditor,
  findNode,
} from '@sewellstephens/plate-common';
import { jsx } from '@sewellstephens/plate-test-utils';

import { moveListItemsToList } from './moveListItemsToList';

jsx;

const input = (
  <editor>
    <hul id="1">
      <hli>
        <hp>1</hp>
      </hli>
    </hul>
    <hul>
      <hli id="2">
        <hp>2</hp>
        <hul>
          <hli>
            <hp>21</hp>
          </hli>
          <hli>
            <hp>22</hp>
          </hli>
        </hul>
      </hli>
    </hul>
  </editor>
) as any as SlateEditor;

const output = (
  <editor>
    <hul id="1">
      <hli>
        <hp>1</hp>
      </hli>
      <hli>
        <hp>21</hp>
      </hli>
      <hli>
        <hp>22</hp>
      </hli>
    </hul>
    <hul>
      <hli id="2">
        <hp>2</hp>
      </hli>
    </hul>
  </editor>
) as any as SlateEditor;

it('should', () => {
  const editor = createSlateEditor({
    editor: input,
  });

  const fromListItem = findNode(editor, { match: { id: '2' } }) as any;
  const toList = findNode(editor, { match: { id: '1' } }) as any;

  if (fromListItem && toList) {
    moveListItemsToList(editor, { fromListItem, toList });
  }

  expect(editor.children).toEqual(output.children);
});
