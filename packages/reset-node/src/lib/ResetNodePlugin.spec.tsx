/** @jsx jsx */

import { createSlateEditor } from '@sewellstephens/plate-common';
import { jsx } from '@sewellstephens/plate-test-utils';

import { ResetNodePlugin } from './ResetNodePlugin';

jsx;

describe('ResetNodePlugin', () => {
  describe('when delete from start to end of editor', () => {
    const input = (
      <editor>
        <hp test="test">
          <anchor />
          test
        </hp>
        <hp>
          test
          <focus />
        </hp>
      </editor>
    ) as any;

    const output = (
      <editor>
        <hp>
          <htext />
          <cursor />
        </hp>
      </editor>
    ) as any;

    it('should reset', () => {
      const editor = createSlateEditor({
        editor: input,
        plugins: [ResetNodePlugin],
      });

      editor.deleteFragment();

      expect(editor.children).toEqual(output.children);
    });
  });

  describe('when delete from end to start of editor', () => {
    const input = (
      <editor>
        <hp test="test">
          <focus />
          test
        </hp>
        <hp>
          test
          <anchor />
        </hp>
      </editor>
    ) as any;

    const output = (
      <editor>
        <hp>
          <htext />
          <cursor />
        </hp>
      </editor>
    ) as any;

    it('should reset', () => {
      const editor = createSlateEditor({
        editor: input,
        plugins: [ResetNodePlugin],
      });

      editor.deleteFragment();

      expect(editor.children).toEqual(output.children);
    });
  });

  describe('when delete at first block start', () => {
    const input = (
      <editor>
        <hh1 test="test">
          <cursor />
          test
        </hh1>
      </editor>
    ) as any;

    const output = (
      <editor>
        <hp>
          <cursor />
          test
        </hp>
      </editor>
    ) as any;

    it('should reset', () => {
      const editor = createSlateEditor({
        editor: input,
        plugins: [ResetNodePlugin],
      });

      editor.deleteBackward('character');

      expect(editor.children).toEqual(output.children);
    });
  });
});
