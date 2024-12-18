/** @jsx jsx */

import type { SlateEditor } from '@sewellstephens/plate-common';

import { createLateEditor } from '@sewellstephens/plate-common/react';
import { jsx } from '@sewellstephens/plate-test-utils';

import { TablePlugin } from '../../lib/TablePlugin';
import { deleteColumn } from './deleteColumn';

jsx;

describe('deleteColumn', () => {
  describe('when 2x2', () => {
    it('should delete column', () => {
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
            <htr>
              <htd>
                <hp>21</hp>
              </htd>
              <htd>
                <hp>
                  22
                  <cursor />
                </hp>
              </htd>
            </htr>
          </htable>
        </editor>
      ) as any as SlateEditor;

      const output = (
        <editor>
          <htable>
            <htr>
              <htd>
                <hp>11</hp>
              </htd>
            </htr>
            <htr>
              <htd>
                <hp>21</hp>
              </htd>
            </htr>
          </htable>
        </editor>
      ) as any as SlateEditor;

      const editor = createLateEditor({
        editor: input,
        plugins: [TablePlugin],
      });

      deleteColumn(editor);

      expect(editor.children).toEqual(output.children);
    });
  });

  describe('when first row has 2 cells, second row has 1 cell, focus 12', () => {
    it('should delete cell 12', () => {
      const input = (
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
            <htr>
              <htd>
                <hp>21</hp>
              </htd>
            </htr>
          </htable>
        </editor>
      ) as any as SlateEditor;

      const output = (
        <editor>
          <htable>
            <htr>
              <htd>
                <hp>11</hp>
              </htd>
            </htr>
            <htr>
              <htd>
                <hp>21</hp>
              </htd>
            </htr>
          </htable>
        </editor>
      ) as any as SlateEditor;

      const editor = createLateEditor({
        editor: input,
        plugins: [TablePlugin],
      });

      deleteColumn(editor);

      expect(editor.children).toEqual(output.children);
    });
  });

  describe('when first row has 2 cells, second row has 1 cell, focus 11', () => {
    it('should delete 11', () => {
      const input = (
        <editor>
          <htable>
            <htr>
              <htd>
                <hp>
                  11
                  <cursor />
                </hp>
              </htd>
              <htd>
                <hp>12</hp>
              </htd>
            </htr>
            <htr>
              <htd>
                <hp>21</hp>
              </htd>
            </htr>
          </htable>
        </editor>
      ) as any as SlateEditor;

      const output = (
        <editor>
          <htable>
            <htr>
              <htd>
                <hp>12</hp>
              </htd>
            </htr>
            <htr>
              <htd>
                <hp>21</hp>
              </htd>
            </htr>
          </htable>
        </editor>
      ) as any as SlateEditor;

      const editor = createLateEditor({
        editor: input,
        plugins: [TablePlugin],
      });

      deleteColumn(editor);

      expect(editor.children).toEqual(output.children);
    });
  });

  describe('when first row has 2 cells, second row has 1 cell, focus 21', () => {
    it('should do nothing', () => {
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
            <htr>
              <htd>
                <hp>
                  21
                  <cursor />
                </hp>
              </htd>
            </htr>
          </htable>
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
                <hp>12</hp>
              </htd>
            </htr>
            <htr>
              <htd>
                <hp>
                  21
                  <cursor />
                </hp>
              </htd>
            </htr>
          </htable>
        </editor>
      ) as any as SlateEditor;

      const editor = createLateEditor({
        editor: input,
        plugins: [TablePlugin],
      });

      deleteColumn(editor);

      expect(editor.children).toEqual(output.children);
    });
  });
});
