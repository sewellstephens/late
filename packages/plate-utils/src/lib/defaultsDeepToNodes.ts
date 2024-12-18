import type { ApplyDeepToNodesOptions } from '@sewell_stephens/late-core';
import type { TNode } from '@sewell_stephens/slate';

import { applyDeepToNodes } from '@sewell_stephens/late-core';
import defaults from 'lodash/defaults.js';

/** Recursively merge a source object to children nodes with a query. */
export const defaultsDeepToNodes = <N extends TNode>(
  options: Omit<ApplyDeepToNodesOptions<N>, 'apply'>
) => {
  applyDeepToNodes({ ...options, apply: defaults });
};
