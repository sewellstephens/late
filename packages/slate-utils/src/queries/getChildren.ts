import type { Path } from 'slate';

import {
  type ChildOf,
  type TNode,
  type TNodeEntry,
  isAncestor,
} from '@sewell_stephens/slate';

/** Get children node entries of a node entry. TODO: try Node.children */
export const getChildren = <N extends ChildOf<R>, R extends TNode = TNode>(
  nodeEntry: TNodeEntry<R>
): TNodeEntry<N>[] => {
  const [node, path] = nodeEntry;

  if (isAncestor(node)) {
    const { children } = node;

    return children.map((child, index) => {
      const childPath: Path = path.concat([index]);

      return [child as N, childPath];
    });
  }

  return [];
};
