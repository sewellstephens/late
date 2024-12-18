import type { Path } from 'slate';

import {
  type TEditor,
  type TNodeEntry,
  getNodeEntry,
  getPreviousPath,
} from '@sewell_stephens/late-common';

import { getCellInPreviousTableRow } from './getCellInPreviousTableRow';

export const getPreviousTableCell = (
  editor: TEditor,
  currentCell: TNodeEntry,
  currentPath: Path,
  currentRow: TNodeEntry
): TNodeEntry | undefined => {
  const prevPath = getPreviousPath(currentPath);

  if (!prevPath) {
    const [, currentRowPath] = currentRow;

    return getCellInPreviousTableRow(editor, currentRowPath);
  }

  const cell = getNodeEntry(editor, prevPath);

  if (cell) return cell;
};
