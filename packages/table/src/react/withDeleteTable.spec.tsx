/** @jsx jsx */

import type { SlateEditor } from '@sewell_stephens/late-common';

import {
  type LateEditor,
  createLateEditor,
  getEditorPlugin,
} from '@sewell_stephens/late-common/react';
import { jsx } from '@sewell_stephens/late-test-utils';

import { TablePlugin } from '../lib/TablePlugin';
import { withDeleteTable } from './withDeleteTable';

jsx;

describe('withDeleteTable', () => {
  // https://github.com/udecode/editor-protocol/issues/22
  describe('Delete backward after a table', () => {
    it('should select the last cell', () => {
      const input = (
        <editor>
          <htable>
            <htr>
              <htd>
                <hp>11</hp>
              </htd>
              <htd>
                <hp>12</hp>
              </htd>
            </htr>
          </htable>
          <hp>
            <cursor />a
          </hp>
        </editor>
      ) as any as SlateEditor;

      const output = (
        <editor>
          <htable>
            <htr>
              <htd>
                <hp>11</hp>
              </htd>
              <htd>
                <hp>
                  12
                  <cursor />
                </hp>
              </htd>
            </htr>
          </htable>
          <hp>a</hp>
        </editor>
      ) as any as LateEditor;

      const plugin = TablePlugin;
      let editor = createLateEditor({
        editor: input,
        plugins: [plugin],
      });

      editor = withDeleteTable(getEditorPlugin(editor, plugin) as any) as any;

      editor.deleteBackward('character');

      expect(editor.children).toEqual(output.children);
      expect(editor.selection).toEqual(output.selection);
    });
  });

  // https://github.com/udecode/editor-protocol/issues/23
  describe('Delete forward before a table', () => {
    it('should select its first cell', () => {
      const input = (
        <editor>
          <hp>
            a
            <cursor />
          </hp>
          <htable>
            <htr>
              <htd>
                <hp>11</hp>
              </htd>
              <htd>
                <hp>12</hp>
              </htd>
            </htr>
          </htable>
        </editor>
      ) as any as SlateEditor;

      const output = (
        <editor>
          <hp>a</hp>
          <htable>
            <htr>
              <htd>
                <hp>
                  <cursor />
                  11
                </hp>
              </htd>
              <htd>
                <hp>12</hp>
              </htd>
            </htr>
          </htable>
        </editor>
      ) as any as SlateEditor;

      const plugin = TablePlugin;
      let editor = createLateEditor({
        editor: input,
        plugins: [plugin],
      });

      editor = withDeleteTable(getEditorPlugin(editor, plugin)) as any;

      editor.deleteForward('character');

      expect(editor.children).toEqual(output.children);
      expect(editor.selection).toEqual(output.selection);
    });
  });

  // https://github.com/udecode/editor-protocol/issues/21
  // https://github.com/udecode/editor-protocol/issues/25
  describe('Delete when selecting cells', () => {
    let editor: any;
    let output: any;

    beforeEach(() => {
      const input = (
        <editor>
          <htable>
            <htr>
              <htd>
                <anchor />
                11
              </htd>
              <htd>
                <hp>12</hp>
              </htd>
            </htr>
            <htr>
              <htd>
                21
                <focus />
              </htd>
              <htd>
                <hp>22</hp>
              </htd>
            </htr>
          </htable>
        </editor>
      ) as any as SlateEditor;

      output = (
        <editor>
          <htable>
            <htr>
              <htd>
                <hp>
                  <htext />
                  <anchor />
                </hp>
              </htd>
              <htd>
                <hp>12</hp>
              </htd>
            </htr>
            <htr>
              <htd>
                <hp>
                  <htext />
                  <focus />
                </hp>
              </htd>
              <htd>
                <hp>22</hp>
              </htd>
            </htr>
          </htable>
        </editor>
      ) as any as SlateEditor;

      const plugin = TablePlugin;
      editor = createLateEditor({
        editor: input,
        plugins: [plugin],
      });

      editor = withDeleteTable(getEditorPlugin(editor, plugin));

      editor.deleteFragment();
    });

    it('should remove the cells content', () => {
      expect(editor.children).toEqual(output.children);
    });

    it('should set the selection to the last cell', () => {
      expect(editor.selection).toEqual(output.selection);
    });
  });
});
