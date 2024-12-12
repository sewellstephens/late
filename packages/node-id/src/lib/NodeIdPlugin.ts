import {
  type PluginConfig,
  type QueryNodeOptions,
  createTSlatePlugin,
} from '@sewellstephens/plate-common';

import { withNodeId } from './withNodeId';

export type NodeIdConfig = PluginConfig<
  'nodeId',
  {
    /**
     * By default, when a node inserted using editor.insertNode(s) has an id, it
     * will be used instead of the id generator, except if it already exists in
     * the document. Set this option to true to disable this behavior.
     */
    disableInsertOverrides?: boolean;

    /**
     * Filter `Text` nodes.
     *
     * @default true
     */
    filterText?: boolean;

    /**
     * ID factory, e.g. `uuid`
     *
     * @default () => Date.now()
     */
    idCreator?: Function;

    /**
     * Node key to store the id.
     *
     * @default 'id'
     */
    idKey?: string;

    /**
     * Reuse ids on undo/redo and copy/pasting if not existing in the document.
     * This is disabled by default to avoid duplicate ids across documents.
     *
     * @default false
     */
    reuseId?: boolean;
  } & QueryNodeOptions
>;

/** @see {@link withNodeId} */
export const NodeIdPlugin = createTSlatePlugin<NodeIdConfig>({
  extendEditor: withNodeId,
  key: 'nodeId',
  options: {
    filter: () => true,
    filterText: true,
    idCreator: () => Math.random().toString(36).slice(2, 7),
    idKey: 'id',
  },
});
