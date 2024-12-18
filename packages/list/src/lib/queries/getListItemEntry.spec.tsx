/** @jsx jsx */

import type { SlateEditor } from '@sewell_stephens/late-common';

import { createLateEditor } from '@sewell_stephens/late-common/react';
import { jsx } from '@sewell_stephens/late-test-utils';

import { getListItemEntry } from './getListItemEntry';

jsx;

describe('when the cursor is in a list item paragraph', () => {
  const input = (
    <editor>
      <hul>
        <hli>
          <hp>
            1
            <cursor />
          </hp>
        </hli>
      </hul>
    </editor>
  ) as any as SlateEditor;

  const listNode = (
    <hul>
      <hli>
        <hp>
          1
          <cursor />
        </hp>
      </hli>
    </hul>
  ) as any;

  const listItemNode = (
    <hli>
      <hp>
        1
        <cursor />
      </hp>
    </hli>
  ) as any;

  it('should be', () => {
    const editor = createLateEditor({ editor: input });

    const res = getListItemEntry(editor);

    expect(res).toEqual({
      list: [listNode, [0]],
      listItem: [listItemNode, [0, 0]],
    });
  });
});

describe('when the cursor is in a nested list item paragraph', () => {
  const input = (
    <editor>
      <hul>
        <hli>
          <hp>1</hp>
          <hul>
            <hli>
              <hp>
                2
                <cursor />
              </hp>
            </hli>
          </hul>
        </hli>
      </hul>
    </editor>
  ) as any as SlateEditor;

  const listNode = (
    <hul>
      <hli>
        <hp>
          2
          <cursor />
        </hp>
      </hli>
    </hul>
  ) as any;

  const listItemNode = (
    <hli>
      <hp>
        2
        <cursor />
      </hp>
    </hli>
  ) as any;

  it('should be', () => {
    const editor = createLateEditor({ editor: input });

    const res = getListItemEntry(editor);

    expect(res).toEqual({
      list: [listNode, [0, 0, 1]],
      listItem: [listItemNode, [0, 0, 1, 0]],
    });
  });
});

describe('when the selection range includes root list item', () => {
  const input = (
    <editor>
      <hul>
        <hli>
          <hp>
            aa
            <focus />
            aa
          </hp>
          <hul>
            <hli>
              <hp>
                bb
                <anchor />
                bb
              </hp>
            </hli>
          </hul>
        </hli>
      </hul>
    </editor>
  ) as any as SlateEditor;

  const listNode = (
    <hul>
      <hli>
        <hp>aaaa</hp>
        <hul>
          <hli>
            <hp>bbbb</hp>
          </hli>
        </hul>
      </hli>
    </hul>
  ) as any;

  const listItemNode = (
    <hli>
      <hp>
        aa
        <focus />
        aa
      </hp>
      <hul>
        <hli>
          <hp>
            bb
            <anchor />
            bb
          </hp>
        </hli>
      </hul>
    </hli>
  ) as any;

  it('should be', () => {
    const editor = createLateEditor({ editor: input });

    const res = getListItemEntry(editor);

    expect(res).toEqual({
      list: [listNode, [0]],
      listItem: [listItemNode, [0, 0]],
    });
  });
});

describe('when the cursor is not in a list item', () => {
  const input = (
    <editor>
      <hul>
        <hli>
          <hp>1</hp>
        </hli>
      </hul>
      <hp>
        2<cursor />
      </hp>
    </editor>
  ) as any as SlateEditor;

  it('should be', () => {
    const editor = createLateEditor({ editor: input });

    const res = getListItemEntry(editor);

    expect(res).toEqual(undefined);
  });
});
