import type { Modify } from '@sewell_stephens/utils';

import { Node, type NodeTextsOptions } from 'slate';

import type { TextOf } from '../text/TText';
import type { NodeOf, TNode } from './TNode';
import type { TNodeEntry } from './TNodeEntry';

/** Return a generator of all leaf text nodes in a root node. */
export const getNodeTexts = <N extends TextOf<R>, R extends TNode = TNode>(
  root: R,
  options?: Modify<
    NonNullable<NodeTextsOptions>,
    {
      pass?: (entry: TNodeEntry<NodeOf<N>>) => boolean;
    }
  >
) =>
  Node.texts(root, options as any) as Generator<TNodeEntry<N>, void, undefined>;
