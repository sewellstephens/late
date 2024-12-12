import type { ApplyDeepToNodesOptions } from '@sewellstephens/plate-core';
import type { TNode } from '@sewellstephens/slate';

import { applyDeepToNodes } from '@sewellstephens/plate-core';
import defaults from 'lodash/defaults.js';

/** Recursively merge a source object to children nodes with a query. */
export const defaultsDeepToNodes = <N extends TNode>(
  options: Omit<ApplyDeepToNodesOptions<N>, 'apply'>
) => {
  applyDeepToNodes({ ...options, apply: defaults });
};
