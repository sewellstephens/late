import type { Modify } from '@sewell_stephens/utils';

import { Node, type NodeNodesOptions } from 'slate';

import type { NodeOf, TNode } from './TNode';
import type { TNodeEntry } from './TNodeEntry';

/**
 * Return a generator of all the node entries of a root node. Each entry is
 * returned as a `[Node, Path]` tuple, with the path referring to the node's
 * position inside the root node.
 */
export const getNodes = <N extends NodeOf<R>, R extends TNode = TNode>(
  root: R,
  options?: Modify<
    NonNullable<NodeNodesOptions>,
    {
      pass?: (entry: TNodeEntry<NodeOf<N>>) => boolean;
    }
  >
) =>
  Node.nodes(root, options as any) as Generator<TNodeEntry<N>, void, undefined>;
