/** @jsx jsx */

import type { SlateEditor } from '@sewellstephens/plate-core';

import { jsx } from '@sewellstephens/plate-test-utils';
import { findNode } from '@sewellstephens/slate';
import { Path } from 'slate';

import { moveChildren } from './moveChildren';

jsx;

const input = (
  <editor>
    <hul>
      <hli>
        <hp>11</hp>
      </hli>
      <hli id="12">
        <hp>12</hp>
      </hli>
    </hul>
    <hul id="2">
      <hli>
        <hp>21</hp>
      </hli>
      <hli>
        <hp>22</hp>
      </hli>
    </hul>
  </editor>
) as any as SlateEditor;

const output = (
  <editor>
    <hul>
      <hli>
        <hp>11</hp>
      </hli>
      <hli id="12">
        <hp>12</hp>
      </hli>
      <hli>
        <hp>21</hp>
      </hli>
      <hli>
        <hp>22</hp>
      </hli>
    </hul>
    <hul id="2">
      <htext />
    </hul>
  </editor>
) as any as SlateEditor;

it('should be', () => {
  const atPath = findNode(input, { match: { id: '2' } })?.[1];
  const toPath = findNode(input, { match: { id: '12' } })?.[1];

  const moved =
    atPath &&
    toPath &&
    moveChildren(input, { at: atPath, to: Path.next(toPath) });

  expect(input.children).toEqual(output.children);
  expect(moved).toBe(2);
});
