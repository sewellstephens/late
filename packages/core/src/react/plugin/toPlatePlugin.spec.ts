import type { ExtendEditor, NodeComponent, LatePlugin } from './LatePlugin';

import {
  type ExtendConfig,
  type PluginConfig,
  type SlatePlugin,
  createSlatePlugin,
  createTSlatePlugin,
  resolvePluginTest,
} from '../../lib';
import { createLateEditor } from '../editor';
import { toLatePlugin, toTLatePlugin } from './toLatePlugin';

type CodeBlockConfig = PluginConfig<
  'code_block',
  { syntax: boolean; syntaxPopularFirst: boolean },
  {
    plugin: {
      getSyntaxState: () => boolean;
    };
    toggleSyntax: () => void;
  }
>;

type CodeBlockConfig2 = {
  api: {
    plugin: {
      getLanguage: () => string;
    };
    plugin2: {
      setLanguage: (lang: string) => void;
    };
  };
  options: { hotkey: string | string[] };
} & CodeBlockConfig;

describe('toLatePlugin', () => {
  const BaseParagraphPlugin = createSlatePlugin({
    key: 'p',
    node: { isElement: true },
    options: { t: 1 },
    parsers: {
      html: {
        deserializer: {
          query: ({ element }) => element.style.fontFamily !== 'Consolas',
          rules: [{ validNodeName: 'P' }],
        },
      },
    },
  }).extendEditorApi(() => ({
    baseApiMethod: () => 'base',
  }));

  const MockComponent: NodeComponent = () => null;
  const MockAboveComponent: NodeComponent = () => null;

  it('should extend a SlatePlugin with React-specific properties and API', () => {
    const ParagraphPlugin = toLatePlugin(BaseParagraphPlugin, {
      handlers: { onKeyDown: () => true },
      options: { hotkey: ['mod+opt+0', 'mod+shift+0'] },
      render: { aboveEditable: MockAboveComponent, node: MockComponent },
    }).extendEditorApi(() => ({
      someApiMethod: () => 'API method result',
    }));

    const editor = createLateEditor({ plugins: [ParagraphPlugin] });
    const resolvedPlugin = editor.plugins.p;

    expect(resolvedPlugin.render.node).toBe(MockComponent);
    expect(resolvedPlugin.render.aboveEditable).toBe(MockAboveComponent);
    expect(resolvedPlugin.handlers).toHaveProperty('onKeyDown');
    expect(resolvedPlugin.options).toEqual({
      hotkey: ['mod+opt+0', 'mod+shift+0'],
      t: 1,
    });
    expect(resolvedPlugin.api.baseApiMethod()).toBe('base');
    expect(resolvedPlugin.api.someApiMethod()).toBe('API method result');
  });

  it('should extend with a function configuration', () => {
    const ParagraphPlugin = toLatePlugin(
      BaseParagraphPlugin,
      ({ editor }) => ({
        options: { editorId: editor.id },
        render: { node: MockComponent },
      })
    ).extendEditorApi(({ editor }) => ({
      getEditorId: () => editor.id,
    }));

    const editor = createLateEditor({ plugins: [ParagraphPlugin] });
    const resolvedPlugin = editor.plugins.p;

    expect(resolvedPlugin.render.node).toBe(MockComponent);
    expect(resolvedPlugin.options).toHaveProperty('editorId');
    expect(resolvedPlugin.options.t).toBe(1);
    expect(resolvedPlugin.api.getEditorId()).toBe(editor.id);
  });

  it('should add new handlers and API methods', () => {
    const mockOnKeyDown = jest.fn();
    const mockOnChange = jest.fn();

    const ParagraphPlugin = toLatePlugin(BaseParagraphPlugin, {
      handlers: {
        onChange: mockOnChange,
        onKeyDown: mockOnKeyDown,
      },
    }).extendEditorApi(() => ({
      customMethod: () => 'custom result',
    }));

    const editor = createLateEditor({ plugins: [ParagraphPlugin] });
    const resolvedPlugin = editor.plugins.p;

    expect(resolvedPlugin.handlers).toHaveProperty('onKeyDown', mockOnKeyDown);
    expect(resolvedPlugin.handlers).toHaveProperty('onChange', mockOnChange);
    expect(resolvedPlugin.api.customMethod()).toBe('custom result');
  });

  it('should throw an error when extending a non-existent plugin', () => {
    const NonExistentPlugin = { key: 'nonexistent' };

    expect(() => {
      toLatePlugin(NonExistentPlugin as any, {
        render: { node: MockComponent },
      });
    }).toThrow();
  });

  // Type checks for toLatePlugin
  it('should have correct types', () => {
    type TestConfig = PluginConfig<'test', { foo: string }>;
    type ExtendedConfig = PluginConfig<'test', { baz: number; foo: string }>;

    const basePlugin: SlatePlugin<TestConfig> = createTSlatePlugin();
    const extended: LatePlugin<ExtendedConfig> = toLatePlugin(basePlugin, {
      options: { baz: 123 },
    });

    // This line should not have any type errors
    extended.options.foo;
    extended.options.baz;
  });
});

describe('toLatePlugin type tests', () => {
  it('should work with CodeBlockConfig for toLatePlugin', () => {
    const BaseCodeBlockPlugin = createTSlatePlugin<CodeBlockConfig>({
      key: 'code_block',
      options: { syntax: true, syntaxPopularFirst: false },
    }).extendEditorApi<CodeBlockConfig['api']>(() => ({
      plugin: {
        getSyntaxState: () => true,
      },
      toggleSyntax: () => {},
    }));

    const CodeBlockPlugin = toLatePlugin(BaseCodeBlockPlugin, {
      extendEditor: ({ api, editor }) => {
        api.plugin.getSyntaxState();
        // @ts-expect-error
        api.plugin.getLanguage();

        return editor;
      },
      handlers: {},
      options: { hotkey: ['mod+opt+8', 'mod+shift+8'] },
    })
      .extendEditorApi(() => ({
        plugin: {
          getLanguage: () => 'javascript' as string,
        },
        plugin2: {
          setLanguage: (_: string) => {},
        },
      }))
      .extend({
        extendEditor: ({ api, editor }) => {
          api.plugin.getSyntaxState();
          api.plugin.getLanguage();

          return editor;
        },
      });

    const editor = createLateEditor({
      plugins: [CodeBlockPlugin],
    });

    expect(editor.getOptions(CodeBlockPlugin)).toEqual({
      hotkey: ['mod+opt+8', 'mod+shift+8'],
      syntax: true,
      syntaxPopularFirst: false,
    });

    // Type checks
    const options = CodeBlockPlugin.options;
    options.syntax;
    options.syntaxPopularFirst;
    options.hotkey;

    // API type checks
    editor.api.toggleSyntax();
    editor.api.plugin.getSyntaxState();
    editor.api.plugin2.setLanguage('python');
    editor.api.plugin.getLanguage();

    // Plugin API type checks
    const pluginApi = editor.plugins.code_block.api;
    pluginApi.toggleSyntax();
    pluginApi.plugin.getSyntaxState();
    pluginApi.plugin2.setLanguage('ruby');
    pluginApi.plugin.getLanguage();

    // @ts-expect-error - Non-existent method
    editor.api.nonExistentMethod;

    // @ts-expect-error - Non-existent method
    pluginApi.nonExistentMethod;
  });

  it('should work with function-based extension', () => {
    const BaseCodeBlockPlugin = createTSlatePlugin<CodeBlockConfig>({
      key: 'code_block',
      options: { syntax: true, syntaxPopularFirst: false },
    });

    const CodeBlockPlugin = toLatePlugin(
      BaseCodeBlockPlugin,
      ({ getOptions }) => {
        // Type check: should have access to base options
        getOptions().syntax;
        getOptions().syntaxPopularFirst;

        return {
          options: { hotkey: ['mod+opt+8', 'mod+shift+8'] },
        };
      }
    );

    expect(
      createLateEditor({ plugins: [CodeBlockPlugin] }).getOptions(
        CodeBlockPlugin
      )
    ).toEqual({
      hotkey: ['mod+opt+8', 'mod+shift+8'],
      syntax: true,
      syntaxPopularFirst: false,
    });

    // Type checks
    const extendedOptions = CodeBlockPlugin.options;
    extendedOptions.syntax;
    extendedOptions.syntaxPopularFirst;
    extendedOptions.hotkey;
  });

  it('should allow partial extension of options', () => {
    type TestConfig = PluginConfig<'test', { bar: number; foo: string }>;

    const BasePlugin = createTSlatePlugin<TestConfig>({
      key: 'test',
      options: { bar: 0, foo: 'initial' },
    });

    const ExtendedPlugin = toLatePlugin(BasePlugin, {
      options: { bar: 42 },
    });

    expect(resolvePluginTest(ExtendedPlugin).options).toEqual({
      bar: 42,
      foo: 'initial',
    });

    // Type checks
    const options = ExtendedPlugin.options;
    options.foo;
    options.bar;
  });

  it('should allow adding new properties', () => {
    type BaseConfig = PluginConfig<'test', { foo: string }>;
    type ExtendedConfig = ExtendConfig<BaseConfig, { bar: number }>;

    const BasePlugin = createTSlatePlugin<BaseConfig>({
      key: 'test',
      options: { foo: 'initial' },
    });

    const ExtendedPlugin = toLatePlugin<BaseConfig, { bar: number }>(
      BasePlugin,
      {
        options: { bar: 42 },
      }
    );

    expect(resolvePluginTest(ExtendedPlugin).options).toEqual({
      bar: 42,
      foo: 'initial',
    });

    // Type checks
    const options = ExtendedPlugin.options;
    options.foo;
    options.bar;

    const ExtendedTPlugin = toTLatePlugin<ExtendedConfig>(BasePlugin, {
      options: { bar: 42 },
    });

    expect(resolvePluginTest(ExtendedTPlugin).options).toEqual({
      bar: 42,
      foo: 'initial',
    });

    // Type checks
    const options2 = ExtendedTPlugin.options;
    options2.foo;
    options2.bar;
  });
});

// Type tests for toTLatePlugin
describe('toTLatePlugin type tests', () => {
  it('should work with CodeBlockConfig for toTLatePlugin', () => {
    type ExtendEditor2 = ExtendEditor<CodeBlockConfig2>;

    const BaseCodeBlockPlugin = createTSlatePlugin<CodeBlockConfig>({
      key: 'code_block',
      options: { syntax: true, syntaxPopularFirst: false },
    }).extendEditorApi<CodeBlockConfig['api']>(() => ({
      plugin: {
        getSyntaxState: () => true,
      },
      toggleSyntax: () => {},
    }));

    const CodeBlockPlugin = toTLatePlugin<CodeBlockConfig2, CodeBlockConfig>(
      BaseCodeBlockPlugin,
      {
        options: {
          hotkey: ['mod+opt+8', 'mod+shift+8'],
        },
      }
    )
      .extendEditorApi(() => ({
        plugin: {
          getLanguage: () => 'javascript',
        },
        plugin2: {
          setLanguage: (_: string) => {},
        },
      }))
      .extend({
        extendEditor: ({ api, editor }) => {
          api.plugin.getLanguage!();

          return editor;
        },
      });

    const editor = createLateEditor({
      plugins: [CodeBlockPlugin],
    });

    expect(editor.getOptions(CodeBlockPlugin)).toEqual({
      hotkey: ['mod+opt+8', 'mod+shift+8'],
      syntax: true,
      syntaxPopularFirst: false,
    });

    // Type checks
    const options = CodeBlockPlugin.options;
    options.syntax;
    options.syntaxPopularFirst;
    options.hotkey;

    // API type checks
    editor.api.toggleSyntax();
    editor.api.plugin.getSyntaxState();
    editor.api.plugin2.setLanguage('python');
    editor.api.plugin.getLanguage();

    // Plugin API type checks
    const pluginApi = editor.plugins.code_block.api;
    pluginApi.toggleSyntax();
    pluginApi.plugin.getSyntaxState();
    pluginApi.plugin2.setLanguage('ruby');
    pluginApi.plugin.getLanguage();

    // @ts-expect-error - Non-existent method
    editor.api.nonExistentMethod;

    // @ts-expect-error - Non-existent method
    pluginApi.nonExistentMethod;
  });

  it('should work with function-based extension and explicit typing', () => {
    type CodeBlockConfig = PluginConfig<
      'code_block',
      { syntax: boolean; syntaxPopularFirst: boolean }
    >;
    type CodeBlockConfig2 = ExtendConfig<CodeBlockConfig, { hotkey: string[] }>;

    const BaseCodeBlockPlugin = createTSlatePlugin<CodeBlockConfig>({
      key: 'code_block',
      options: { syntax: true, syntaxPopularFirst: false },
    });

    const CodeBlockPlugin2 = toTLatePlugin<CodeBlockConfig2, CodeBlockConfig>(
      BaseCodeBlockPlugin,
      ({ getOptions }) => {
        // @ts-expect-error
        getOptions().nonExisting;
        getOptions().syntax;

        return {
          options: { hotkey: ['mod+opt+8', 'mod+shift+8'] },
        };
      }
    );

    expect(
      createLateEditor({ plugins: [CodeBlockPlugin2] }).getOptions(
        CodeBlockPlugin2
      )
    ).toEqual({
      hotkey: ['mod+opt+8', 'mod+shift+8'],
      syntax: true,
      syntaxPopularFirst: false,
    });
  });
});

describe('toLatePlugin with extendPlugin', () => {
  it('should correctly type extendPlugin with SlatePlugin', () => {
    type BaseConfig = PluginConfig<'base', { foo: string }>;
    type ChildConfig = PluginConfig<
      'child',
      { bar: number },
      { child: () => void }
    >;

    const BasePlugin = createTSlatePlugin<BaseConfig>({
      key: 'base',
      options: { foo: 'initial' },
    });

    const ChildPlugin: SlatePlugin<ChildConfig> =
      createTSlatePlugin<ChildConfig>({
        key: 'child',
        options: { bar: 42 },
      });

    const ExtendedPlugin = toLatePlugin(BasePlugin, {
      plugins: [ChildPlugin],
    })
      .extendPlugin(ChildPlugin, {
        options: { bar: 100 },
      })
      .configurePlugin(ChildPlugin, {
        options: { bar: 100 },
      });

    // Type checks
    const options = ExtendedPlugin.options;
    options.foo;
    // @ts-expect-error - bar is not in the base plugin options
    options.bar;
  });

  it('should correctly type extendPlugin with LatePlugin', () => {
    type BaseConfig = PluginConfig<'base', { foo: string }>;
    type ChildConfig = PluginConfig<'child', { bar: number }>;

    const BasePlugin = createTSlatePlugin<BaseConfig>({
      key: 'base',
      options: { foo: 'initial' },
    });

    const ChildLatePlugin: LatePlugin<ChildConfig> = toLatePlugin(
      createTSlatePlugin<ChildConfig>({
        key: 'child',
        options: { bar: 42 },
      }),
      {
        render: { node: () => null }, // Add a React-specific property
      }
    );

    const ExtendedPlugin = toLatePlugin(BasePlugin, {
      plugins: [ChildLatePlugin],
    })
      .extendPlugin(ChildLatePlugin, {
        options: { bar: 100 },
        render: { node: () => null }, // Modify a React-specific property
      })
      .configurePlugin(ChildLatePlugin, () => ({
        options: { bar: 100 },
      }));

    // Type checks
    const options = ExtendedPlugin.options;
    options.foo;
    // @ts-expect-error - bar is not in the base plugin options
    options.bar;
  });
});

describe('toLatePlugin with direct merge for object configs', () => {
  it('should directly merge object configs without pushing to __extensions', () => {
    type LinkConfig = PluginConfig<
      'link',
      {
        allowedSchemes: string[];
        isUrl: (text: string) => boolean;
      }
    >;

    const isUrl = (text: string) => text.startsWith('http');

    const BaseLinkPlugin = createTSlatePlugin<LinkConfig>({
      key: 'link',
      options: {
        allowedSchemes: ['http', 'https'],
        isUrl,
      },
    }).extend(() => ({
      options: {
        allowedSchemes: ['http', 'https', 'mailto', 'tel'],
      },
    }));

    const LinkPlugin = toLatePlugin(BaseLinkPlugin, {
      options: {
        allowedSchemes: ['http', 'https', 'mailto'],
      },
    });

    expect(LinkPlugin.options).toEqual({
      allowedSchemes: ['http', 'https', 'mailto'],
      isUrl,
    });

    expect(resolvePluginTest(LinkPlugin).options).toEqual({
      allowedSchemes: ['http', 'https', 'mailto', 'tel'],
      isUrl,
    });
  });

  it('should override an existing component', () => {
    const NewComponent: NodeComponent = () => null;

    const basePlugin = createSlatePlugin({
      key: 'testPlugin',
    });

    const plugin = toLatePlugin(basePlugin);

    const pluginWithNewComponent = plugin.withComponent(NewComponent);
    const resolvedPlugin = resolvePluginTest(pluginWithNewComponent);

    expect(resolvedPlugin.render.node).toBe(NewComponent);
  });
});
