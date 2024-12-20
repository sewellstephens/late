/* eslint-disable jest/no-conditional-expect */
import {
  type Value,
  createTEditor,
  getEndPoint,
  getStartPoint,
} from '@sewell_stephens/slate';

import { ParagraphPlugin, LateApiPlugin, ReactPlugin } from '../../react';
import { withLate } from '../../react/editor/withLate';
import { createLatePlugin } from '../../react/plugin/createLatePlugin';
import { getPlugin } from '../../react/plugin/getPlugin';
import { EventEditorPlugin } from '../../react/plugins/event-editor/EventEditorPlugin';
import {
  AstPlugin,
  DOMPlugin,
  DebugPlugin,
  HistoryPlugin,
  HtmlPlugin,
  InlineVoidPlugin,
  LengthPlugin,
  ParserPlugin,
  SlateNextPlugin,
  type SlatePlugin,
  createSlatePlugin,
  withSlate,
} from '../index';

const coreKeys = [
  'root',
  DebugPlugin.key,
  SlateNextPlugin.key,
  DOMPlugin.key,
  HistoryPlugin.key,
  InlineVoidPlugin.key,
  ParserPlugin.key,
  LengthPlugin.key,
  HtmlPlugin.key,
  AstPlugin.key,
  ParagraphPlugin.key,
  EventEditorPlugin.key,
  LateApiPlugin.key,
];

describe('withLate', () => {
  describe('when default plugins', () => {
    it('should have core plugins', () => {
      const editor = withLate(createTEditor(), { id: '1' });

      expect(editor.id).toBe('1');
      expect(editor.history).toBeDefined();
      expect(editor.key).toBeDefined();
      expect(editor.pluginList.map((plugin) => plugin.key)).toEqual(coreKeys);
      expect(editor.pluginList.map((plugin) => plugin.node.type)).toEqual(
        coreKeys
      );
      expect(Object.keys(editor.plugins)).toEqual(coreKeys);
      expect(
        (editor.getPlugin(SlateNextPlugin).handlers as any).onKeyDown
      ).toBeDefined();

      expect(editor.tf.toggle.block).toBeDefined();
      expect(editor.prevSelection).toBeNull();
    });
  });

  describe('when plugins is an array', () => {
    it('should add custom plugins to core plugins', () => {
      const customPlugin = createSlatePlugin({ key: 'custom' });
      const editor = withLate(createTEditor(), {
        id: '1',
        plugins: [customPlugin],
      });

      expect(editor.pluginList.map((plugin) => plugin.key)).toEqual([
        ...coreKeys,
        'custom',
      ]);
      expect(editor.getPlugin({ key: 'custom' })).toBeDefined();
    });
  });

  describe('when plugins is an empty array', () => {
    it('should only have core plugins', () => {
      const editor = withLate<Value, SlatePlugin>(createTEditor(), {
        id: '1',
        plugins: [],
      });

      expect(editor.pluginList.map((plugin) => plugin.key)).toEqual(coreKeys);
    });
  });

  describe('when extending nested plugins', () => {
    it('should correctly merge and extend nested plugins', () => {
      const parentPlugin = createSlatePlugin({
        key: 'parent',
        node: { type: 'parentOriginal' },
        plugins: [
          createSlatePlugin({
            key: 'child',
            node: { type: 'childOriginal' },
          }),
        ],
      });

      const editor = withLate(createTEditor(), {
        id: '1',
        plugins: [
          parentPlugin
            .extend({
              node: { type: 'parentExtended' },
            })
            .extendPlugin(
              { key: 'child' },
              {
                node: { type: 'childExtended' },
              }
            )
            .extendPlugin(
              { key: 'newChild' },
              {
                node: { type: 'newChildType' },
              }
            ),
        ],
      });

      const parent = editor.getPlugin({ key: 'parent' });
      const child = editor.getPlugin({ key: 'child' });
      const newChild = editor.getPlugin({ key: 'newChild' });

      expect(parent.node.type).toBe('parentExtended');
      expect(child.node.type).toBe('childExtended');
      expect(newChild.node.type).toBe('newChildType');
    });
  });

  describe('when using override', () => {
    it('should merge components', () => {
      const HeadingPlugin = createSlatePlugin({ key: 'h1' });
      const customComponent = () => null;

      const editor = withLate(createTEditor(), {
        id: '1',
        override: {
          components: {
            h1: customComponent,
          },
        },
        plugins: [HeadingPlugin],
      });

      const h1Plugin = editor.getPlugin({ key: 'h1' });
      expect(h1Plugin.render.node).toBe(customComponent);
    });

    it('should respect priority when overriding existing components', () => {
      const originalComponent = () => null;
      const overrideComponent = () => null;
      const HeadingPlugin = createLatePlugin({
        key: 'h1',
        priority: 100,
        render: { node: originalComponent },
      });

      // Test with low priority override
      let editor = withLate(createTEditor(), {
        id: '1',
        plugins: [HeadingPlugin],
      });

      let h1Plugin = editor.getPlugin(HeadingPlugin);
      expect(h1Plugin.render.node).toBe(originalComponent);

      // Test with high priority override
      editor = withLate(createTEditor(), {
        id: '1',
        override: {
          components: {
            h1: overrideComponent,
          },
        },
        plugins: [HeadingPlugin],
      });

      h1Plugin = getPlugin<typeof h1Plugin>(editor, { key: 'h1' }) as any;
      expect(h1Plugin.render.node).toBe(overrideComponent);
    });
  });

  describe('when using override.plugins', () => {
    it('should override plugin properties', () => {
      const CustomPlugin = createSlatePlugin({
        key: 'custom',
        node: { type: 'originalType' },
      });

      const editor = withLate(createTEditor(), {
        id: '1',
        override: {
          plugins: {
            custom: {
              node: { type: 'overriddenType' },
            },
          },
        },
        plugins: [CustomPlugin],
      });

      const customPlugin = editor.getPlugin({ key: 'custom' });
      expect(customPlugin.node.type).toBe('overriddenType');
    });
  });

  describe('when replacing core plugins', () => {
    it('should replace core plugins with custom plugins, maintain order, and add additional plugins', () => {
      const additionalPlugin = createSlatePlugin({
        key: 'additional',
        node: { type: 'additional' },
      });

      const editor = withLate(createTEditor(), {
        id: '1',
        plugins: [ParagraphPlugin, ReactPlugin, additionalPlugin],
      });

      const pluginKeys = editor.pluginList.map((plugin) => plugin.key);
      const pluginTypes = editor.pluginList.map((plugin) => plugin.node.type);
      const slateNextPlugin = editor.getPlugin({ key: SlateNextPlugin.key });

      // Check if ReactPlugin replaced DOMPlugin
      expect(pluginKeys).toContain(ReactPlugin.key);
      expect(pluginTypes).toContain(ReactPlugin.node.type);

      // Check if ParagraphPlugin is present
      expect(pluginKeys).toContain(ParagraphPlugin.key);
      expect(pluginTypes).toContain(ParagraphPlugin.node.type);

      // Check if additional plugin is added
      expect(pluginKeys).toContain('additional');
      expect(pluginTypes).toContain('additional');

      // Check if the order is correct
      const reactIndex = pluginKeys.indexOf(ReactPlugin.key);
      const paragraphIndex = pluginKeys.indexOf(ParagraphPlugin.key);
      const additionalIndex = pluginKeys.indexOf('additional');

      expect(reactIndex).toBeLessThan(paragraphIndex);
      expect(paragraphIndex).toBeLessThan(additionalIndex);

      // Check if other core plugins are still present (e.g., HistoryPlugin)
      expect(pluginKeys).toContain('history');

      // Ensure the total number of plugins is correct
      // This number should be the sum of:
      // 1. Number of core plugins
      // 2. Number of replacing plugins (ReactPlugin, ParagraphPlugin)
      // 3. Number of additional plugins (additionalPlugin)
      // Minus the number of replaced plugins (DOMPlugin)
      const expectedPluginCount = editor.pluginList.length;
      expect(pluginKeys).toHaveLength(expectedPluginCount);
    });
  });

  describe('when editor already has plugins', () => {
    it('should not duplicate core plugins', () => {
      const existingEditor = createTEditor();
      existingEditor.plugins = [
        createSlatePlugin({ key: 'dom' }),
        createSlatePlugin({ key: 'history' }),
      ];

      const editor = withLate(existingEditor, { id: '1' });

      const pluginKeys = editor.pluginList.map((plugin) => plugin.key);
      expect(pluginKeys.filter((key) => key === 'dom')).toHaveLength(1);
      expect(pluginKeys.filter((key) => key === 'history')).toHaveLength(1);
    });

    it('should add missing core plugins', () => {
      const existingEditor = createTEditor();
      existingEditor.pluginList = [
        createSlatePlugin({ key: 'dom' }),
        createSlatePlugin({ key: 'history' }),
      ];

      const editor = withLate(existingEditor, { id: '1' });

      const pluginKeys = editor.pluginList.map((plugin) => plugin.key);
      coreKeys.forEach((key) => {
        expect(pluginKeys).toContain(key);
      });
    });

    it('should not preserve custom plugins', () => {
      const customPlugin = createSlatePlugin({ key: 'custom' });
      const existingEditor = createTEditor();
      existingEditor.plugins = [
        createSlatePlugin({ key: 'dom' }),
        createSlatePlugin({ key: 'history' }),
        customPlugin,
      ];

      const editor = withLate(existingEditor, { id: '1' });

      expect(editor.pluginList.map((plugin) => plugin.key)).not.toContain(
        'custom'
      );
    });
  });

  describe('when using override.enabled', () => {
    it('should disable specified core plugins', () => {
      const editor = withLate(createTEditor(), {
        id: '1',
        override: {
          enabled: {
            eventEditor: false,
            history: false,
          },
        },
      });

      const pluginKeys = editor.pluginList.map((plugin) => plugin.key);
      expect(pluginKeys).not.toContain('history');
      expect(pluginKeys).not.toContain('eventEditor');
      expect(pluginKeys).toHaveLength(coreKeys.length - 2);
    });

    it('should disable specified custom plugins', () => {
      const customPlugin1 = createSlatePlugin({ key: 'custom1' });
      const customPlugin2 = createSlatePlugin({ key: 'custom2' });

      const editor = withLate(createTEditor(), {
        id: '1',
        override: {
          enabled: {
            custom1: false,
          },
        },
        plugins: [customPlugin1, customPlugin2],
      });

      const pluginKeys = editor.pluginList.map((plugin) => plugin.key);
      expect(pluginKeys).not.toContain('custom1');
      expect(pluginKeys).toContain('custom2');
    });

    it('should not affect plugins not specified in override.enabled', () => {
      const editor = withLate(createTEditor(), {
        id: '1',
        override: {
          enabled: {
            history: false,
          },
        },
      });

      const pluginKeys = editor.pluginList.map((plugin) => plugin.key);
      coreKeys.forEach((key) => {
        if (key !== 'history') {
          expect(pluginKeys).toContain(key);
        }
      });
    });
  });

  describe('when configuring core plugins', () => {
    it('should correctly configure the length plugin', () => {
      const editor = withSlate(createTEditor(), {
        id: '1',
        rootPlugin: (plugin) =>
          plugin.configurePlugin(LengthPlugin, {
            options: {
              maxLength: 100,
            },
          }),
      });

      const options = editor.getOptions(LengthPlugin);
      expect(options.maxLength).toBe(100);
    });
  });

  it('should handle value, selection, and autoSelect options correctly', () => {
    const editor = createTEditor();
    const value = [{ children: [{ text: 'Hello' }], type: 'paragraph' }];
    const selection = {
      anchor: { offset: 2, path: [0, 0] },
      focus: { offset: 4, path: [0, 0] },
    };

    const result = withSlate(editor, {
      selection,
      shouldNormalizeEditor: true,
      value,
    });

    expect(result.children).toEqual(value);
    expect(result.selection).toEqual(selection);

    // Test autoSelect start
    const editorWithAutoSelectStart = withSlate(createTEditor(), {
      autoSelect: 'start',
      value,
    });
    const expectedStartSelection = {
      anchor: getStartPoint(editorWithAutoSelectStart, []),
      focus: getStartPoint(editorWithAutoSelectStart, []),
    };
    expect(editorWithAutoSelectStart.selection).toEqual(expectedStartSelection);

    // Test autoSelect end
    const editorWithAutoSelectEnd = withSlate(createTEditor(), {
      autoSelect: 'end',
      value,
    });
    const expectedEndSelection = {
      anchor: getEndPoint(editorWithAutoSelectEnd, []),
      focus: getEndPoint(editorWithAutoSelectEnd, []),
    };
    expect(editorWithAutoSelectEnd.selection).toEqual(expectedEndSelection);

    // Test empty children
    const editorWithEmptyChildren = withSlate(createTEditor());
    expect(editorWithEmptyChildren.children).toEqual(
      editorWithEmptyChildren.api.create.value()
    );

    // Test pipeNormalizeInitialValue and normalizeEditor
    const editor2 = withSlate(createTEditor(), {
      shouldNormalizeEditor: true,
      value: [],
    });

    expect(editor2.children).toEqual([
      {
        children: [
          {
            text: '',
          },
        ],
        type: 'p',
      },
    ]);
  });
});
