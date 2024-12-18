import type { ClientRectObject } from '@floating-ui/core';
import type { TEditor } from '@sewell_stephens/late-common';
import type { Range } from 'slate';

import { toDOMRange } from '@sewell_stephens/late-common/react';

import { getDefaultBoundingClientRect } from '../createVirtualElement';

/** Get bounding client rect by slate range */
export const getRangeBoundingClientRect = (
  editor: TEditor,
  at: Range | null
): ClientRectObject => {
  if (!at) return getDefaultBoundingClientRect();

  const domRange = toDOMRange(editor, at);

  if (!domRange) return getDefaultBoundingClientRect();

  return domRange.getBoundingClientRect();
};
