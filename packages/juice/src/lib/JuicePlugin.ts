import { HtmlPlugin, createSlatePlugin } from '@sewell_stephens/late-common';
import juice from 'juice';

export const JuicePlugin = createSlatePlugin({
  inject: {
    plugins: {
      [HtmlPlugin.key]: {
        parser: {
          transformData: ({ data }) => {
            // juice ignores the first class when there is <!-- just after <style>, so we remove it
            let newData = data.replaceAll(/<style>\s*<!--/g, '<style>');
            newData = juice(newData);

            return newData;
          },
        },
      },
    },
  },
  key: 'juice',
});
