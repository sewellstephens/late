import {
  type ElementEntryOf,
  type ElementOf,
  type ElementOrTextOf,
  type TEditor,
  type TNode,
  type TNodeEntry,
  isDefined,
} from '@sewell_stephens/late-common';
import { IndentPlugin } from '@sewell_stephens/late-indent';

import { IndentListPlugin } from '../IndentListPlugin';

export interface GetSiblingIndentListOptions<
  N extends ElementOf<E>,
  E extends TEditor = TEditor,
> {
  breakOnEqIndentNeqListStyleType?: boolean;
  breakOnLowerIndent?: boolean;
  breakQuery?: (siblingNode: TNode) => boolean | undefined;
  /** Query to break lookup */
  eqIndent?: boolean;
  getNextEntry?: (
    entry: TNodeEntry<ElementOrTextOf<E>>
  ) => TNodeEntry<N> | undefined;
  getPreviousEntry?: (
    entry: TNodeEntry<ElementOrTextOf<E>>
  ) => TNodeEntry<N> | undefined;
  /** Query to validate lookup. If false, check the next sibling. */
  query?: (siblingNode: TNode) => boolean | undefined;
}

/**
 * Get the next sibling indent list node. Default query: the sibling node should
 * have the same listStyleType.
 */
export const getSiblingIndentList = <
  N extends ElementOf<E>,
  E extends TEditor = TEditor,
>(
  editor: E,
  [node, path]: ElementEntryOf<E>,
  {
    breakOnEqIndentNeqListStyleType = true,
    breakOnLowerIndent = true,
    breakQuery,
    eqIndent = true,
    getNextEntry,
    getPreviousEntry,
    query,
  }: GetSiblingIndentListOptions<N, E>
): TNodeEntry<N> | undefined => {
  if (!getPreviousEntry && !getNextEntry) return;

  const getSiblingEntry = getNextEntry ?? getPreviousEntry!;

  let nextEntry = getSiblingEntry([node, path]);

  // eslint-disable-next-line no-constant-condition
  while (true) {
    if (!nextEntry) return;

    const [nextNode, nextPath] = nextEntry;

    const indent = (node as any)[IndentPlugin.key] as number;
    const nextIndent = (nextNode as any)[IndentPlugin.key] as number;

    if (!isDefined(nextIndent)) return;
    if (breakQuery?.(nextNode)) return;
    if (breakOnLowerIndent && nextIndent < indent) return;
    if (
      breakOnEqIndentNeqListStyleType &&
      nextIndent === indent &&
      (nextNode as any)[IndentListPlugin.key] !==
        (node as any)[IndentListPlugin.key]
    )
      return;

    let valid = !query || query(nextNode as TNode);

    if (valid) {
      valid = !eqIndent || nextIndent === indent;

      if (valid) return [nextNode, nextPath];
    }

    nextEntry = getSiblingEntry(nextEntry);
  }
};
