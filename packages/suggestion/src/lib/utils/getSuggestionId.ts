import type { TNode } from '@sewell_stephens/late-common';

import { SUGGESTION_KEYS } from '../SuggestionPlugin';

export const getSuggestionId = (node: TNode) => {
  return node[SUGGESTION_KEYS.id] as string | undefined;
};
