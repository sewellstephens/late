import { type SlateEditor, type TAncestor, match } from '@sewell_stephens/late-common';

import { getListTypes } from './getListTypes';

/** Is there a list child in the node. */
export const hasListChild = (editor: SlateEditor, node: TAncestor) =>
  node.children.some((n) => match(n, [], { type: getListTypes(editor) }));
