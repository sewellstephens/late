import type { Modify } from '@sewell_stephens/utils';

import {
  Editor,
  type Element,
  Path,
  Range,
  type Text,
  type Transforms,
} from 'slate';

import type { NodeMatchOption } from '../../types/NodeMatchOption';
import type { TEditor } from '../editor/TEditor';

import { createPathRef } from '../editor/createPathRef';
import { createPointRef } from '../editor/createPointRef';
import { getAboveNode } from '../editor/getAboveNode';
import { getNodeEntries } from '../editor/getNodeEntries';
import { getParentNode } from '../editor/getParentNode';
import { getPreviousNode } from '../editor/getPreviousNode';
import { isBlock } from '../editor/isBlock';
import { isElementEmpty } from '../editor/isElementEmpty';
import { withoutNormalizing } from '../editor/withoutNormalizing';
import { isElement } from '../element/isElement';
import { hasSingleChild } from '../node/hasSingleChild';
import { isText } from '../text/isText';
import { deleteText } from './deleteText';
import { moveNodes } from './moveNodes';
import { removeNodes } from './removeNodes';
import { select } from './select';

export type MergeNodesOptions<E extends TEditor = TEditor> = {
  /**
   * Default: if the node isn't already the next sibling of the previous node,
   * move it so that it is before merging.
   */
  mergeNode?: (editor: E, options: { at: Path; to: Path }) => void;

  /**
   * Default: if there was going to be an empty ancestor of the node that was
   * merged, we remove it from the tree.
   */
  removeEmptyAncestor?: (editor: E, options: { at: Path }) => void;
} & Modify<
  NonNullable<Parameters<typeof Transforms.mergeNodes>[1]>,
  NodeMatchOption<E>
>;

/**
 * Merge a node at a location with the previous node of the same depth, removing
 * any empty containing nodes after the merge if necessary.
 */
export const mergeNodes = <E extends TEditor>(
  editor: E,
  options: MergeNodesOptions<E> = {}
): void => {
  withoutNormalizing(editor as any, () => {
    let { at = editor.selection, match } = options;
    const {
      hanging = false,
      mergeNode,
      mode = 'lowest',
      removeEmptyAncestor,
      voids = false,
    } = options;

    if (!at) {
      return;
    }
    if (match == null) {
      if (Path.isPath(at)) {
        const [parent] = getParentNode(editor, at)!;
        match = (n) => parent.children.includes(n as any);
      } else {
        match = (n) => isBlock(editor as any, n);
      }
    }
    if (!hanging && Range.isRange(at)) {
      at = Editor.unhangRange(editor as any, at);
    }
    if (Range.isRange(at)) {
      if (Range.isCollapsed(at)) {
        at = at.anchor;
      } else {
        const [, end] = Range.edges(at);
        const pointRef = createPointRef(editor as any, end);
        deleteText(editor, { at });
        at = pointRef.unref()!;

        if (options.at == null) {
          select(editor as any, at);
        }
      }
    }

    const _nodes = getNodeEntries(editor as any, { at, match, mode, voids });
    const [current] = Array.from(_nodes);
    const prev = getPreviousNode(editor as any, { at, match, mode, voids });

    if (!current || !prev) {
      return;
    }

    const [node, path] = current;
    const [prevNode, prevPath] = prev;

    if (path.length === 0 || prevPath.length === 0) {
      return;
    }

    const newPath = Path.next(prevPath);
    const commonPath = Path.common(path, prevPath);
    const isPreviousSibling = Path.isSibling(path, prevPath);
    const _levels = Editor.levels(editor as any, { at: path });
    const levels = new Set(
      Array.from(_levels, ([n]) => n)
        .slice(commonPath.length)
        .slice(0, -1)
    );

    // Determine if the merge will leave an ancestor of the path empty as a
    // result, in which case we'll want to remove it after merging.
    const emptyAncestor = getAboveNode(editor as any, {
      at: path,
      match: (n) => levels.has(n) && isElement(n) && hasSingleChild(n),
      mode: 'highest',
    });

    const emptyRef =
      emptyAncestor && createPathRef(editor as any, emptyAncestor[1]);
    let properties;
    let position;

    // Ensure that the nodes are equivalent, and figure out what the position
    // and extra properties of the merge will be.
    if (isText(node) && isText(prevNode)) {
      const { text, ...rest } = node;
      position = prevNode.text.length;
      properties = rest as Partial<Text>;
    } else if (isElement(node) && isElement(prevNode)) {
      const { children, ...rest } = node;
      position = prevNode.children.length;
      properties = rest as Partial<Element>;
    } else {
      throw new Error(
        `Cannot merge the node at path [${path}] with the previous sibling because it is not the same kind: ${JSON.stringify(
          node
        )} ${JSON.stringify(prevNode)}`
      );
    }
    // If the node isn't already the next sibling of the previous node, move
    // it so that it is before merging.
    if (
      !isPreviousSibling && // DIFF
      !mergeNode
    ) {
      moveNodes(editor, { at: path, to: newPath, voids });
    }
    // If there was going to be an empty ancestor of the node that was merged,
    // we remove it from the tree.
    if (emptyRef) {
      // DIFF: start
      if (removeEmptyAncestor) {
        const emptyPath = emptyRef.current;
        emptyPath && removeEmptyAncestor(editor as any, { at: emptyPath });
      } else {
        removeNodes(editor, { at: emptyRef.current!, voids });
      }
      // DIFF: end
    }
    // If the target node that we're merging with is empty, remove it instead
    // of merging the two. This is a common rich text editor behavior to
    // prevent losing formatting when deleting entire nodes when you have a
    // hanging selection.
    // DIFF: start
    if (mergeNode) {
      mergeNode(editor as any, { at: path, to: newPath });
      // DIFF: end
    } else if (
      (isElement(prevNode) && isElementEmpty(editor as any, prevNode)) ||
      (isText(prevNode) && prevNode.text === '')
    ) {
      removeNodes(editor, { at: prevPath, voids });
    } else {
      editor.apply({
        path: newPath,
        position,
        properties,
        type: 'merge_node',
      });
    }
    if (emptyRef) {
      emptyRef.unref();
    }
  });
};
