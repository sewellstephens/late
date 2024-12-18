import {
  type ExtendConfig,
  type OmitFirst,
  bindFirst,
} from '@sewell_stephens/late-common';
import { Key, toLatePlugin } from '@sewell_stephens/late-common/react';

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
export const CommentsPlugin = toLatePlugin(BaseCommentsPlugin, {
  shortcuts: {
    toggleComment: {
      keys: [[Key.Mod, Key.Shift, 'm']],
    },
  },
  useHooks: useHooksComments,
}).extendEditorTransforms(({ editor }) => ({
  insert: { comment: bindFirst(insertComment, editor) },
}));
