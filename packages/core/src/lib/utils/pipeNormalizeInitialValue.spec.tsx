import React from 'react';

import { renderHook } from '@testing-library/react-hooks';

import { Late, createLateEditor, useEditorValue } from '../../react';
import { createSlatePlugin } from '../plugin';

describe('pipeNormalizeInitialValue', () => {
  const createTestPlugin = (key: string) =>
    createSlatePlugin({
      key,
      normalizeInitialValue: ({ value: initialValue }: any) => {
        initialValue[0].count += 1;

        return initialValue;
      },
    });

  const plugins = [createTestPlugin('a'), createTestPlugin('b')];

  describe('when children is passed to createLateEditor', () => {
    it('should normalize the initial value once', () => {
      const editor = createLateEditor({
        plugins,
        value: [{ children: [{ text: '' }], count: 0, type: 'p' }],
      });

      const wrapper = ({ children }: any) => (
        <Late editor={editor}>{children}</Late>
      );

      const { result } = renderHook(() => useEditorValue(), {
        wrapper,
      });

      expect(result.current).toEqual([
        { children: [{ text: '' }], count: 2, type: 'p' },
      ]);
    });
  });

  describe('when initialValue was previously passed to Late', () => {
    it('should normalize the initial value once', () => {
      const editor = createLateEditor({
        plugins,
        value: [{ children: [{ text: '' }], count: 0, type: 'p' }],
      });

      const wrapper = ({ children }: any) => (
        <Late editor={editor}>{children}</Late>
      );

      const { result } = renderHook(() => useEditorValue(), {
        wrapper,
      });

      expect(result.current).toEqual([
        { children: [{ text: '' }], count: 2, type: 'p' },
      ]);
    });
  });

  describe('when both children and initialValue were previously provided', () => {
    it('should use children and normalize it once', () => {
      const editor = createLateEditor({
        plugins,
        value: [{ children: [{ text: '' }], count: 0, type: 'p' }],
      });

      const wrapper = ({ children }: any) => (
        <Late editor={editor}>{children}</Late>
      );

      const { result } = renderHook(() => useEditorValue(), {
        wrapper,
      });

      expect(result.current).toEqual([
        { children: [{ text: '' }], count: 2, type: 'p' },
      ]);
    });
  });

  describe('when no initial value is provided', () => {
    it('should not normalize', () => {
      const editor = createLateEditor({
        plugins,
      });

      const wrapper = ({ children }: any) => (
        <Late editor={editor}>{children}</Late>
      );

      const { result } = renderHook(() => useEditorValue(), {
        wrapper,
      });

      expect(result.current).toEqual([{ children: [{ text: '' }], type: 'p' }]);
    });
  });

  describe('withLate', () => {
    describe('children handling', () => {
      it('should use provided children', () => {
        const children = [
          { children: [{ text: 'Test' }], count: 0, type: 'p' },
        ];
        const editor = createLateEditor({
          plugins,
          value: children,
        });

        const wrapper = ({ children }: any) => (
          <Late editor={editor}>{children}</Late>
        );

        const { result } = renderHook(() => useEditorValue(), {
          wrapper,
        });

        expect(result.current).toEqual([
          { children: [{ text: 'Test' }], count: 2, type: 'p' },
        ]);
      });

      it('should use create.value when children is empty', () => {
        const editor = createLateEditor({
          plugins,
          value: [{ children: [{ text: 'Factory' }], count: 0, type: 'p' }],
        });

        const wrapper = ({ children }: any) => (
          <Late editor={editor}>{children}</Late>
        );

        const { result } = renderHook(() => useEditorValue(), {
          wrapper,
        });

        expect(result.current).toEqual([
          { children: [{ text: 'Factory' }], count: 2, type: 'p' },
        ]);
      });
    });

    describe('selection handling', () => {
      it('should use provided selection', () => {
        const selection = {
          anchor: { offset: 0, path: [0, 0] },
          focus: { offset: 1, path: [0, 0] },
        };
        const editor = createLateEditor({
          plugins,
          selection,
        });

        expect(editor.selection).toEqual(selection);
      });

      it('should auto-select start when autoSelect is "start"', () => {
        const editor = createLateEditor({
          autoSelect: 'start',
          plugins,
          value: [{ children: [{ text: 'Test' }], type: 'p' }],
        });

        expect(editor.selection).toEqual({
          anchor: { offset: 0, path: [0, 0] },
          focus: { offset: 0, path: [0, 0] },
        });
      });

      it('should auto-select end when autoSelect is true', () => {
        const editor = createLateEditor({
          autoSelect: true,
          plugins,
          value: [{ children: [{ text: 'Test' }], type: 'p' }],
        });

        expect(editor.selection).toEqual({
          anchor: { offset: 4, path: [0, 0] },
          focus: { offset: 4, path: [0, 0] },
        });
      });
    });
  });
});
