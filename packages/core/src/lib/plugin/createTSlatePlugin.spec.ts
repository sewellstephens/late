import type { NodeComponent } from '../../react';
import type { PluginConfig } from './BasePlugin';

import { createTPlatePlugin } from '../../react/plugin/createPlatePlugin';
import { resolveCreatePluginTest, resolvePluginTest } from '../utils';
import { createTSlatePlugin } from './createSlatePlugin';

describe('createTSlatePlugin', () => {
  it('should create a plugin with explicit types and cover various scenarios', () => {
    interface TestOptions {
      optionA?: string;
      optionB?: number;
    }

    interface TestApi {
      testMethod: () => void;
    }

    const basePlugin = resolvePluginTest(
      createTPlatePlugin<PluginConfig<'testPlugin', TestOptions, TestApi>>({
        key: 'testPlugin',
        node: { type: 'test' },
        options: {
          optionA: 'initial',
          optionB: 10,
        },
      }).extendEditorApi(() => ({
        testMethod: () => {},
      }))
    );

    // Test basic plugin creation
    expect(basePlugin.key).toBe('testPlugin');
    expect(basePlugin.node.type).toBe('test');
    expect(basePlugin.options).toEqual({ optionA: 'initial', optionB: 10 });

    // Test configure method
    const configuredPlugin = basePlugin.configure({
      options: { optionA: 'modified' },
    });
    const resolvedConfigured = resolvePluginTest(configuredPlugin);
    expect(resolvedConfigured.options).toEqual({
      optionA: 'modified',
      optionB: 10,
    });

    // Test extend method
    const extendedPlugin = basePlugin.extend({
      node: { type: 'extended' },
      options: { optionB: 20 },
    });
    const resolvedExtended = resolvePluginTest(extendedPlugin);
    expect(resolvedExtended.node.type).toBe('extended');
    expect(resolvedExtended.options).toEqual({
      optionA: 'initial',
      optionB: 20,
    });

    // Test withComponent method
    const MockComponent: NodeComponent = () => null;
    const pluginWithComponent = basePlugin.withComponent(MockComponent);
    const resolvedWithComponent = resolvePluginTest(pluginWithComponent);
    expect(resolvedWithComponent.render.node).toBe(MockComponent);

    // Test nested plugins and extendPlugin
    const nestedPlugin = createTSlatePlugin<
      PluginConfig<'nested', { nestedOption: string }>
    >({
      key: 'nested',
      options: { nestedOption: 'initial' },
    });

    const parentPlugin = createTSlatePlugin<
      PluginConfig<'parent', { parentOption: string }>
    >({
      key: 'parent',
      options: { parentOption: 'parent' },
      plugins: [nestedPlugin],
    });

    const extendedParentPlugin = parentPlugin.extendPlugin(
      { key: 'nested' },
      {
        options: { nestedOption: 'modified' },
      }
    );

    const resolvedParent = resolvePluginTest(extendedParentPlugin);
    expect(resolvedParent.plugins[0].options).toEqual({
      nestedOption: 'modified',
    });

    // Test configurePlugin
    const configuredParentPlugin = parentPlugin.configurePlugin(nestedPlugin, {
      options: { nestedOption: 'configured' },
    });

    const resolvedConfiguredParent = resolvePluginTest(configuredParentPlugin);
    expect(resolvedConfiguredParent.plugins[0].options).toEqual({
      nestedOption: 'configured',
    });

    // Test plugin creation with a function
    const functionPlugin = createTSlatePlugin<
      PluginConfig<'functionPlugin', { editorId: string }>
    >((editor: any) => ({
      key: 'functionPlugin',
      options: { editorId: editor.id },
    }));

    const resolvedFunctionPlugin = resolveCreatePluginTest(functionPlugin);
    expect(resolvedFunctionPlugin.key).toBe('functionPlugin');
    expect(resolvedFunctionPlugin.options).toHaveProperty('editorId');

    // Test multiple extends and configurations
    const multiExtendedPlugin = basePlugin
      .extend({ node: { type: 'firstExtend' } })
      .configure({ options: { optionA: 'firstConfigure' } })
      .extend({ node: { type: 'secondExtend' } })
      .configure({ options: { optionB: 30 } });

    const resolvedMultiExtended = resolvePluginTest(multiExtendedPlugin);
    expect(resolvedMultiExtended.node.type).toBe('secondExtend');
    expect(resolvedMultiExtended.options).toEqual({
      optionA: 'initial',
      optionB: 30,
    });
  });
});
