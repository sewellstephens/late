import React from 'react';

import { render } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import { type Value, isBlock, setNodes } from '@sewellstephens/slate';
import isEqual from 'lodash/isEqual';
import memoize from 'lodash/memoize';

import type { LatePlugins } from '../plugin';

import { type SlatePlugins, createSlatePlugin } from '../../lib';
import { createLateEditor, useLateEditor } from '../editor';
import { createLatePlugin } from '../plugin/createLatePlugin';
import {
  LateController,
  useEditorRef,
  useEditorValue,
  useLateEditorStore,
  useLateSelectors,
} from '../stores';
import { Late } from './Late';
import { LateContent } from './LateContent';

describe('Late', () => {
  describe('useEditorRef()', () => {
    describe('when editor is defined', () => {
      it('should be initialValue', async () => {
        const editor = createLateEditor();

        const wrapper = ({ children }: any) => (
          <Late editor={editor}>{children}</Late>
        );
        const { result } = renderHook(() => useEditorRef(), {
          wrapper,
        });

        expect(result.current).toBe(editor);
      });
    });

    describe('when editor is not defined', () => {
      it('should be default', async () => {
        const editor1 = createLateEditor({ id: 'test1' });
        const editor2 = createLateEditor({ id: 'test2' });

        const wrapper = ({ children }: any) => (
          <Late editor={editor1}>
            <Late editor={editor2}>{children}</Late>
          </Late>
        );

        const { result } = renderHook(() => useEditorRef(), {
          wrapper,
        });

        expect(result.current.id).toBe('test2');
      });
    });

    describe('when id is defined', () => {
      it('should be id', async () => {
        const editor1 = createLateEditor({ id: 'test1' });
        const editor2 = createLateEditor({ id: 'test2' });

        const wrapper = ({ children }: any) => (
          <Late editor={editor1}>
            <Late editor={editor2}>{children}</Late>
          </Late>
        );

        const { result: result1 } = renderHook(() => useEditorRef('test1'), {
          wrapper,
        });
        const { result: result2 } = renderHook(() => useEditorRef('test2'), {
          wrapper,
        });

        expect(result1.current.id).toBe('test1');
        expect(result2.current.id).toBe('test2');
      });
    });
  });

  describe('useEditorValue()', () => {
    describe('when initialValue is defined', () => {
      it('should be initialValue', async () => {
        const initialValue: Value = [
          { children: [{ text: 'test' }], type: 'p' },
        ];
        const editor = createLateEditor({ value: initialValue });

        const wrapper = ({ children }: any) => (
          <Late editor={editor}>{children}</Late>
        );
        const { result } = renderHook(() => useEditorValue(), {
          wrapper,
        });

        expect(result.current).toBe(initialValue);
      });
    });

    describe('when editor with children is defined', () => {
      it('should be editor.children', async () => {
        const editor = createLateEditor();
        editor.children = [{ children: [{ text: 'value' }], type: 'p' }];

        const wrapper = ({ children }: any) => (
          <Late editor={editor}>{children}</Late>
        );
        const { result } = renderHook(() => useEditorValue(), {
          wrapper,
        });

        expect(result.current).toBe(editor.children);
      });
    });

    describe('when editor without children is defined', () => {
      it('should be default', async () => {
        const editor = createLateEditor();

        const wrapper = ({ children }: any) => (
          <Late editor={editor}>{children}</Late>
        );
        const { result } = renderHook(() => useEditorValue(), {
          wrapper,
        });

        expect(result.current).toEqual(editor.api.create.value());
      });
    });
  });

  describe('useLateSelectors().editor().plugins', () => {
    describe('when plugins is updated', () => {
      it('should be updated', () => {
        const editor = createLateEditor({
          plugins: [createSlatePlugin({ key: 'test' })],
        });

        const wrapper = ({ children, editor }: any) => (
          <Late editor={editor}>{children}</Late>
        );
        const { rerender, result } = renderHook(
          () => useLateSelectors().editor().pluginList,
          {
            initialProps: {
              editor,
            },
            wrapper,
          }
        );

        expect(result.current.at(-1)!.key).toBe('test');

        editor.pluginList = [createLatePlugin({ key: 'test2' }) as any];

        rerender({
          editor,
        });

        expect(result.current.at(-1)!.key).toBe('test2');
      });
    });

    it('should use plugins from editor', () => {
      const _plugins = [createSlatePlugin({ key: 'test' })];
      const editor = createLateEditor({ plugins: _plugins });

      const wrapper = ({ children }: any) => (
        <Late editor={editor}>{children}</Late>
      );

      const { result } = renderHook(
        () => useLateSelectors().editor().pluginList,
        {
          wrapper,
        }
      );

      expect(result.current.some((p: any) => p.key === 'test')).toBe(true);
    });
  });

  describe('when id updates', () => {
    it('should remount Late', () => {
      const _plugins1 = [createSlatePlugin({ key: 'test1' })];
      const _plugins2 = [createSlatePlugin({ key: 'test2' })];
      const editor1 = createLateEditor({ id: '1', plugins: _plugins1 });
      const editor2 = createLateEditor({ id: '2', plugins: _plugins2 });

      const wrapper = ({ children, editor }: any) => (
        <Late editor={editor}>{children}</Late>
      );
      const { rerender, result } = renderHook(
        ({ editor }) => useLateSelectors(editor.id).editor().pluginList,
        {
          initialProps: { editor: editor1 },
          wrapper,
        }
      );

      expect(result.current.at(-1)!.key).toBe('test1');

      rerender({ editor: editor2 } as any);

      expect(result.current.at(-1)!.key).toBe('test2');
    });
  });

  describe('useLateSelectors().editor().id', () => {
    describe('when Late has an id', () => {
      it('should be editor id', async () => {
        const editor = createLateEditor({ id: 'test' });

        const wrapper = ({ children }: any) => (
          <Late editor={editor}>{children}</Late>
        );
        const { result } = renderHook(() => useLateSelectors().editor().id, {
          wrapper,
        });

        expect(result.current).toBe('test');
      });
    });

    describe('when Late without id > Late with id', () => {
      it('should be the closest one', () => {
        const wrapper = ({ children }: any) => (
          <Late editor={createLateEditor()}>
            <Late editor={createLateEditor({ id: 'test' })}>{children}</Late>
          </Late>
        );
        const { result } = renderHook(() => useLateSelectors().editor().id, {
          wrapper,
        });

        expect(result.current).toBe('test');
      });
    });

    describe('when Late with id > Late without id > select id', () => {
      it('should be that id', () => {
        const wrapper = ({ children }: any) => (
          <Late editor={createLateEditor({ id: 'test' })}>
            <Late editor={createLateEditor()}>{children}</Late>
          </Late>
        );
        const { result } = renderHook(
          () => useLateSelectors('test').editor().id,
          {
            wrapper,
          }
        );

        expect(result.current).toBe('test');
      });
    });

    describe('when Late has an editor', () => {
      it('should be editor id', async () => {
        const editor = createLateEditor({ id: 'test' });

        const wrapper = ({ children }: any) => (
          <Late editor={editor}>{children}</Late>
        );
        const { result } = renderHook(() => useLateSelectors().editor().id, {
          wrapper,
        });

        expect(result.current).toBe('test');
      });
    });
  });

  describe('useLateEditorStore', () => {
    const getStore = (wrapper: any) =>
      renderHook(() => useLateEditorStore(), { wrapper }).result.current;

    const getId = (wrapper: any) =>
      renderHook(() => useLateSelectors().editor().id, { wrapper }).result
        .current;

    const getIsFallback = (wrapper: any) =>
      renderHook(() => useEditorRef().isFallback, { wrapper }).result.current;

    describe('when Late exists', () => {
      describe('when editor is defined', () => {
        it('returns the store', async () => {
          const editor = createLateEditor({ id: 'test' });

          const wrapper = ({ children }: any) => (
            <Late editor={editor}>{children}</Late>
          );
          expect(getStore(wrapper)).toBeDefined();
          expect(getId(wrapper)).toBe('test');
          expect(getIsFallback(wrapper)).toBe(false);
        });
      });

      describe('when editor is not defined', () => {
        it('returns the store', async () => {
          const editor = createLateEditor({ id: 'test' });

          const wrapper = ({ children }: any) => (
            <Late editor={editor}>{children}</Late>
          );
          expect(getStore(wrapper)).toBeDefined();
          expect(getId(wrapper)).toBe('test');
          expect(getIsFallback(wrapper)).toBe(false);
        });
      });
    });

    describe('when Late does not exist', () => {
      describe('when LateController exists', () => {
        describe('when LateController returns a store', () => {
          it('returns the store', () => {
            const EXPECTED_STORE = 'expected store' as any;

            const wrapper = ({ children }: any) => (
              <LateController
                activeId="test"
                editorStores={{
                  test: EXPECTED_STORE,
                }}
              >
                {children}
              </LateController>
            );

            expect(getStore(wrapper)).toBe(EXPECTED_STORE);
          });
        });

        describe('when LateController returns null', () => {
          it('returns the fallback store', () => {
            const wrapper = ({ children }: any) => (
              <LateController
                activeId="test"
                editorStores={{
                  test: null,
                }}
              >
                {children}
              </LateController>
            );

            expect(getStore(wrapper)).toBeDefined();
            expect(getIsFallback(wrapper)).toBe(true);
          });
        });
      });

      describe('when LateController does not exist', () => {
        it('throws an error', () => {
          const wrapper = ({ children }: any) => <>{children}</>;
          expect(() => getStore(wrapper)).toThrow();
        });
      });
    });
  });

  describe('when shouldNormalizeEditor false', () => {
    it('should not trigger normalize if shouldNormalizeEditor is not set to true', () => {
      const fn = jest.fn((e, [node, path]) => {
        if (isBlock(e, node) && path?.length && !isEqual(node.path, path)) {
          setNodes(e, { path }, { at: path });
        }
      });

      const plugins: SlatePlugins = memoize(
        (): SlatePlugins => [
          createSlatePlugin({
            extendEditor: ({ editor }) => {
              const { normalizeNode } = editor;
              editor.normalizeNode = (n) => {
                fn(editor, n);
                normalizeNode(n);
              };

              return editor;
            },
            key: 'a',
          }),
        ]
      )();

      const editor = createLateEditor({
        plugins,
        value: [{ children: [{ text: '' }] }] as any,
      });

      render(
        <Late editor={editor}>
          <LateContent />
        </Late>
      );

      expect(fn).not.toHaveBeenCalled();

      expect(editor.children).not.toStrictEqual([
        { children: [{ text: '' }], path: [0] },
      ]);
    });
  });

  describe('when render aboveSlate renders null', () => {
    it('should not normalize editor children', () => {
      const plugins: LatePlugins = [
        createLatePlugin({
          key: 'a',
          render: {
            aboveSlate: () => {
              return null;
            },
          },
        }),
      ];

      const editor = createLateEditor({
        plugins,
        value: [{} as any],
      });

      expect(() =>
        render(
          <Late editor={editor}>
            <LateContent />
          </Late>
        )
      ).not.toThrow();
    });
  });

  describe('Late remounting', () => {
    it('should remount when editor is recreated', () => {
      let mountCount = 0;

      const MountCounter = () => {
        React.useEffect(() => {
          mountCount++;
        }, []);

        return null;
      };

      const TestComponent = ({ dep }: { dep: number }) => {
        const editor = useLateEditor({ id: 'test' }, [dep]);

        return (
          <Late editor={editor}>
            <LateContent />
            <MountCounter />
          </Late>
        );
      };

      const { rerender } = render(<TestComponent dep={1} />);

      expect(mountCount).toBe(1);

      // Rerender with the same dependency
      rerender(<TestComponent dep={1} />);
      expect(mountCount).toBe(1);

      // Rerender with a different dependency
      rerender(<TestComponent dep={2} />);
      expect(mountCount).toBe(2);
    });
  });
});
