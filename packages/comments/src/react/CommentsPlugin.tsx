import {
  type ExtendConfig,
  type OmitFirst,
  bindFirst,
} from '@sewellstephens/plate-common';
import { Key, toPlatePlugin } from '@sewellstephens/plate-common/react';

import {
  type CommentsConfig as BaseCommentsConfig,
  CommentsPlugin as BaseCommentsPlugin,
} from '../lib/CommentsPlugin';
import { insertComment } from './transforms';
import { useHooksComments } from './useHooksComments';

export type CommentsConfig = ExtendConfig<
  BaseCommentsConfig,
  {},
  {},
  {
    insert: {
      comment: OmitFirst<typeof insertComment>;
    };
  }
>;

/** Enables support for comments in the editor. */
export const CommentsPlugin = toPlatePlugin(BaseCommentsPlugin, {
  shortcuts: {
    toggleComment: {
      keys: [[Key.Mod, Key.Shift, 'm']],
    },
  },
  useHooks: useHooksComments,
}).extendEditorTransforms(({ editor }) => ({
  insert: { comment: bindFirst(insertComment, editor) },
}));
