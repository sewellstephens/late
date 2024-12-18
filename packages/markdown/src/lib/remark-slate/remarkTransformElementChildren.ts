import type { TDescendant } from '@sewell_stephens/late-common';

import type { MdastNode, RemarkPluginOptions } from './types';

import { remarkTransformNode } from './remarkTransformNode';

export const remarkTransformElementChildren = (
  node: MdastNode,
  options: RemarkPluginOptions
): TDescendant[] => {
  const { children } = node;

  if (!children) return [];

  return children.flatMap((child) => remarkTransformNode(child, options));
};
