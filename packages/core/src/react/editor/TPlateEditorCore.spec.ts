import type { Value } from '@sewellstephens/slate';

import {
  DebugPlugin,
  type InferPlugins,
  createSlateEditor,
  createSlatePlugin,
  someHtmlElement,
} from '@sewellstephens/plate-core';
import { createLateEditor, withLate } from '@sewellstephens/plate-core/react';
import { LinkPlugin } from '@sewellstephens/plate-link/react';

describe('TLateEditor core package', () => {
  const MyCustomPlugin = createSlatePlugin({
    api: { myCustomMethod: () => {} },
    key: 'myCustom',
  });

  const TextFormattingPlugin = createSlatePlugin({
    api: {
      bold: () => {},
      italic: () => {},
      underline: () => {},
    },
    key: 'textFormatting',
  });

  const ListPlugin = createSlatePlugin({
    api: {
      createBulletedList: () => {},
    },
    key: 'list',
  });

  const TablePlugin = createSlatePlugin({
    api: {
      addRow: () => {},
      insertTable: () => {},
    },
    key: 'table',
  });

  const ImagePlugin = createSlatePlugin({
    api: {
      insertImage: () => {},
      resizeImage: () => {},
    },
    key: 'image',
  });

  describe('Core Plugins', () => {
    it('should have DebugPlugin methods with default generics', () => {
      const editor = createSlateEditor();

      expect(editor.api.debug).toBeDefined();
      expect(editor.api.debug.log).toBeInstanceOf(Function);
      expect(editor.api.debug.error).toBeInstanceOf(Function);
      expect(editor.api.debug.info).toBeInstanceOf(Function);
      expect(editor.api.debug.warn).toBeInstanceOf(Function);

      // @ts-expect-error
      editor.api.debug.nonExistentMethod;
    });

    it('should have DebugPlugin methods with default generics', () => {
      const editor = createLateEditor();

      expect(editor.api.debug).toBeDefined();
      expect(editor.api.debug.log).toBeInstanceOf(Function);
      expect(editor.api.debug.error).toBeInstanceOf(Function);
      expect(editor.api.debug.info).toBeInstanceOf(Function);
      expect(editor.api.debug.warn).toBeInstanceOf(Function);

      // @ts-expect-error
      editor.api.debug.nonExistentMethod;
    });

    it('should work with a mix of core and custom plugins', () => {
      const slateEditor = createSlateEditor({
        plugins: [DebugPlugin, TextFormattingPlugin, ImagePlugin, LinkPlugin],
      });

      expect(slateEditor.api.debug).toBeDefined();
      expect(slateEditor.api.bold).toBeInstanceOf(Function);
      expect(slateEditor.api.insertImage).toBeInstanceOf(Function);

      // @ts-expect-error
      slateEditor.api.createBulletedList;

      const editor = createLateEditor({
        plugins: [DebugPlugin, TextFormattingPlugin, ImagePlugin, LinkPlugin],
      });

      expect(editor.api.debug).toBeDefined();
      expect(editor.api.bold).toBeInstanceOf(Function);
      expect(editor.api.insertImage).toBeInstanceOf(Function);

      // @ts-expect-error
      editor.api.createBulletedList;
    });

    it('should work extending a plugin', () => {
      const editor = createLateEditor({
        plugins: [
          LinkPlugin.extend({
            parsers: {
              html: {
                deserializer: {
                  parse: () => ({ test: true }),
                  withoutChildren: true,
                },
              },
            },
          }),
        ],
      });

      expect(editor.api.link.getAttributes).toBeDefined();

      // @ts-expect-error
      editor.api.createBulletedList;
    });
  });

  describe('Custom Plugins', () => {
    it('should infer single and multiple plugin types correctly', () => {
      const singlePluginEditor = createLateEditor({
        plugins: [MyCustomPlugin],
      });
      expect(singlePluginEditor.api.myCustomMethod).toBeInstanceOf(Function);

      const multiPluginEditor = createLateEditor({
        plugins: [TextFormattingPlugin, ListPlugin, TablePlugin],
      });
      expect(multiPluginEditor.api.bold).toBeInstanceOf(Function);
      expect(multiPluginEditor.api.createBulletedList).toBeInstanceOf(Function);
      expect(multiPluginEditor.api.insertTable).toBeInstanceOf(Function);

      // @ts-expect-error
      multiPluginEditor.api.nonExistentMethod;
    });

    it('should work with createLateEditor', () => {
      const editor = createLateEditor({
        plugins: [MyCustomPlugin, ListPlugin, ImagePlugin],
      });

      expect(editor.api.myCustomMethod).toBeInstanceOf(Function);
      expect(editor.api.createBulletedList).toBeInstanceOf(Function);
      expect(editor.api.insertImage).toBeInstanceOf(Function);

      // @ts-expect-error
      editor.api.insertTable;
    });

    it('should allow extending editor with new plugins', () => {
      const plugins = [TextFormattingPlugin, ListPlugin];
      const editor1 = createLateEditor({
        plugins,
      });

      const editor = withLate<
        Value,
        InferPlugins<typeof plugins> | typeof TablePlugin
      >(editor1, {
        plugins: [...editor1.pluginList, TablePlugin],
      });

      expect(editor.api.bold).toBeInstanceOf(Function);
      expect(editor.api.createBulletedList).toBeInstanceOf(Function);
      expect(editor.api.insertTable).toBeInstanceOf(Function);

      // @ts-expect-error
      editor.api.insertImage;
    });

    it('should handle plugins with overlapping api names', () => {
      const OverlappingPlugin = createSlatePlugin({
        api: {
          bold: (_: number) => {},
          insertImage: (_: number) => {},
        },
        key: 'overlapping',
      });

      const editor = createLateEditor({
        plugins: [TextFormattingPlugin, OverlappingPlugin, ImagePlugin],
      });

      expect(editor.api.bold).toBeInstanceOf(Function);
      expect(editor.api.italic).toBeInstanceOf(Function);
      expect(editor.api.insertImage).toBeInstanceOf(Function);
      expect(editor.api.resizeImage).toBeInstanceOf(Function);

      // @ts-expect-error
      editor.api.nonExistentMethod;
    });
  });

  describe('Plugin', () => {
    const BoldPlugin = createSlatePlugin<'bold'>({
      key: 'bold',
      node: { isLeaf: true },
      parsers: {
        html: {
          deserializer: {
            query: ({ element }) =>
              !someHtmlElement(
                element,
                (node) => node.style.fontWeight === 'normal'
              ),
            rules: [
              { validNodeName: ['STRONG', 'B'] },
              { validStyle: { fontWeight: ['600', '700', 'bold'] } },
            ],
          },
        },
      },
    });

    it('should work with specific plugin types', () => {
      const editor = createLateEditor<Value, typeof BoldPlugin>({
        plugins: [BoldPlugin],
      });

      expect(editor.plugins[BoldPlugin.key]).toBeDefined();
    });
  });
});
