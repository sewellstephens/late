import { ParagraphPlugin, createSlatePlugin } from '@sewell_stephens/late-common';

/** Creates a plugin that adds alignment functionality to the editor. */
export const AlignPlugin = createSlatePlugin({
  inject: {
    nodeProps: {
      defaultNodeValue: 'start',
      nodeKey: 'align',
      styleKey: 'textAlign',
      validNodeValues: ['start', 'left', 'center', 'right', 'end', 'justify'],
    },
    targetPluginToInject: ({ editor, plugin }) => ({
      parsers: {
        html: {
          deserializer: {
            parse: ({ element, node }) => {
              if (element.style.textAlign) {
                node[editor.getType(plugin)] = element.style.textAlign;
              }
            },
          },
        },
      },
    }),
    targetPlugins: [ParagraphPlugin.key],
  },
  key: 'align',
});
