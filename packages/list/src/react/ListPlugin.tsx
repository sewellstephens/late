import { Key, toLatePlugin } from '@sewellstephens/plate-common/react';

import {
  BulletedListPlugin as BaseBulletedListPlugin,
  ListItemContentPlugin as BaseListItemContentPlugin,
  ListItemPlugin as BaseListItemPlugin,
  ListPlugin as BaseListPlugin,
  NumberedListPlugin as BaseNumberedListPlugin,
} from '../lib';
import { onKeyDownList } from './onKeyDownList';
import { withList } from './withList';

export const BulletedListPlugin = toLatePlugin(BaseBulletedListPlugin, {
  dependencies: ['list'],
  handlers: {
    onKeyDown: onKeyDownList,
  },
});

export const NumberedListPlugin = toLatePlugin(BaseNumberedListPlugin, {
  dependencies: ['list'],
  handlers: {
    onKeyDown: onKeyDownList,
  },
});

export const ListItemContentPlugin = toLatePlugin(BaseListItemContentPlugin);

export const ListItemPlugin = toLatePlugin(BaseListItemPlugin);

/**
 * Enables support for bulleted, numbered and to-do lists with React-specific
 * features.
 */
export const ListPlugin = toLatePlugin(BaseListPlugin, {
  extendEditor: withList,
  plugins: [
    BulletedListPlugin,
    NumberedListPlugin,
    ListItemPlugin,
    ListItemContentPlugin,
  ],
}).extend(({ editor }) => ({
  shortcuts: {
    toggleBulletedList: {
      handler: () => {
        editor.getTransforms(ListPlugin).toggle.bulletedList();
      },
      keys: [[Key.Mod, Key.Alt, '5']],
      preventDefault: true,
    },
    toggleNumberedList: {
      handler: () => {
        editor.getTransforms(ListPlugin).toggle.numberedList();
      },
      keys: [[Key.Mod, Key.Alt, '6']],
      preventDefault: true,
    },
  },
}));
