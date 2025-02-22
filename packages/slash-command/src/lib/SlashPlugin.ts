import {
  type TriggerComboboxPluginOptions,
  withTriggerCombobox,
} from '@sewell_stephens/late-combobox';
import {
  type PluginConfig,
  type TElement,
  createSlatePlugin,
  createTSlatePlugin,
} from '@sewell_stephens/late-common';

export interface TSlashInputElement extends TElement {}

export type SlashConfig = PluginConfig<
  'slash_command',
  TriggerComboboxPluginOptions
>;

export const SlashInputPlugin = createSlatePlugin({
  key: 'slash_input',
  node: { isElement: true, isInline: true, isVoid: true },
});

export const SlashPlugin = createTSlatePlugin<SlashConfig>({
  extendEditor: withTriggerCombobox,
  key: 'slash_command',
  options: {
    createComboboxInput: () => ({
      children: [{ text: '' }],
      type: SlashInputPlugin.key,
    }),
    trigger: '/',
    triggerPreviousCharPattern: /^\s?$/,
  },
  plugins: [SlashInputPlugin],
});
