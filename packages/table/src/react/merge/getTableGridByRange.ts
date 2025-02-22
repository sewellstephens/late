import type { Range } from 'slate';

import {
  type SlateEditor,
  type TElement,
  type TElementEntry,
  findNode,
  getEditorPlugin,
} from '@sewell_stephens/late-common';
import { findNodePath } from '@sewell_stephens/late-common/react';

import type {
  TTableCellElement,
  TTableElement,
  TTableRowElement,
} from '../../lib/types';

import { TablePlugin } from '../../lib/TablePlugin';
import { computeCellIndices } from '../../lib/merge/computeCellIndices';
import { findCellByIndexes } from '../../lib/merge/findCellByIndexes';
import { getCellIndices } from '../../lib/merge/getCellIndices';
import { getCellIndicesWithSpans } from '../../lib/merge/getCellIndicesWithSpans';
import { getCellTypes } from '../../lib/utils';
import { getEmptyTableNode } from '../../lib/utils/getEmptyTableNode';

type FormatType = 'all' | 'cell' | 'table';

interface TableGridEntries {
  cellEntries: TElementEntry[];
  tableEntries: TElementEntry[];
}

type GetTableGridReturnType<T> = T extends 'all'
  ? TableGridEntries
  : TElementEntry[];

interface GetTableGridByRangeOptions<T extends FormatType> {
  at: Range;

  /**
   * Format of the output:
   *
   * - Table element
   * - Array of cells
   */
  format?: T;
}

/**
 * Get sub table between 2 cell paths. Ensure that the selection is always a
 * valid table grid.
 */
export const getTableMergeGridByRange = <T extends FormatType>(
  editor: SlateEditor,
  { at, format }: GetTableGridByRangeOptions<T>
): GetTableGridReturnType<T> => {
  const { api, getOptions, type } = getEditorPlugin(editor, TablePlugin);

  const { _cellIndices: cellIndices } = getOptions();

  const startCellEntry = findNode<TTableCellElement>(editor, {
    at: at.anchor.path,
    match: { type: getCellTypes(editor) },
  })!;
  const endCellEntry = findNode<TTableCellElement>(editor, {
    at: at.focus.path,
    match: { type: getCellTypes(editor) },
  })!;

  const startCell = startCellEntry[0];
  const endCell = endCellEntry[0];

  const startCellPath = at.anchor.path;
  const tablePath = startCellPath.slice(0, -2);

  const tableEntry = findNode<TTableElement>(editor, {
    at: tablePath,
    match: { type },
  })!;
  const realTable = tableEntry[0];

  const { col: _startColIndex, row: _startRowIndex } = getCellIndicesWithSpans(
    getCellIndices(cellIndices!, startCell) ||
      computeCellIndices(editor, realTable, startCell)!,
    startCell
  );

  const { col: _endColIndex, row: _endRowIndex } = getCellIndicesWithSpans(
    getCellIndices(cellIndices!, endCell) ||
      computeCellIndices(editor, realTable, endCell)!,
    endCell
  );

  let startRowIndex = Math.min(_startRowIndex, _endRowIndex);
  let endRowIndex = Math.max(_startRowIndex, _endRowIndex);
  let startColIndex = Math.min(_startColIndex, _endColIndex);
  let endColIndex = Math.max(_startColIndex, _endColIndex);

  const relativeRowIndex = endRowIndex - startRowIndex;
  const relativeColIndex = endColIndex - startColIndex;

  let table: TTableElement = getEmptyTableNode(editor, {
    children: [],
    colCount: relativeColIndex + 1,
    rowCount: relativeRowIndex + 1,
  });

  let cellEntries: TElementEntry[] = [];
  let cellsSet = new WeakSet();

  let rowIndex = startRowIndex;
  let colIndex = startColIndex;

  // eslint-disable-next-line no-constant-condition
  while (true) {
    const cell = findCellByIndexes(editor, realTable, rowIndex, colIndex);

    if (!cell) {
      break;
    }

    const indicies =
      getCellIndices(cellIndices!, cell) ||
      computeCellIndices(editor, realTable, cell)!;
    const { col: cellColWithSpan, row: cellRowWithSpan } =
      getCellIndicesWithSpans(indicies, cell);
    const { col: cellCol, row: cellRow } = indicies;

    // check if cell is still in range
    const hasOverflowTop = cellRow < startRowIndex;
    const hasOverflowBottom = cellRowWithSpan > endRowIndex;
    const hasOverflowLeft = cellCol < startColIndex;
    const hasOverflowRight = cellColWithSpan > endColIndex;

    if (
      hasOverflowTop ||
      hasOverflowBottom ||
      hasOverflowLeft ||
      hasOverflowRight
    ) {
      // reset the cycle if has overflow
      cellsSet = new WeakSet();
      cellEntries = [];
      startRowIndex = Math.min(startRowIndex, cellRow);
      endRowIndex = Math.max(endRowIndex, cellRowWithSpan);
      startColIndex = Math.min(startColIndex, cellCol);
      endColIndex = Math.max(endColIndex, cellColWithSpan);
      rowIndex = startRowIndex;
      colIndex = startColIndex;
      const newRelativeRowIndex = endRowIndex - startRowIndex;
      const newRelativeColIndex = endColIndex - startColIndex;
      table = getEmptyTableNode(editor, {
        children: [],
        colCount: newRelativeColIndex + 1,
        rowCount: newRelativeRowIndex + 1,
      });

      continue;
    }
    if (!cellsSet.has(cell)) {
      cellsSet.add(cell);

      const rows = table.children[rowIndex - startRowIndex]
        .children as TElement[];
      rows[colIndex - startColIndex] = cell;

      const cellPath = findNodePath(editor, cell)!;
      cellEntries.push([cell, cellPath]);
    }
    if (colIndex + 1 <= endColIndex) {
      colIndex = colIndex + 1;
    } else if (rowIndex + 1 <= endRowIndex) {
      colIndex = startColIndex;
      rowIndex = rowIndex + 1;
    } else {
      break;
    }
  }

  const formatType = (format as string) || 'table';

  if (formatType === 'cell') {
    return cellEntries as GetTableGridReturnType<T>;
  }

  // clear redundant cells
  table.children?.forEach((rowEl) => {
    const rowElement = rowEl as TTableRowElement;

    const filteredChildren = rowElement.children?.filter((cellEl) => {
      const cellElement = cellEl as TTableCellElement;

      return api.table.getCellChildren!(cellElement).length > 0;
    });

    rowElement.children = filteredChildren;
  });

  if (formatType === 'table') {
    return [[table, tablePath]] as GetTableGridReturnType<T>;
  }

  return {
    cellEntries,
    tableEntries: [[table, tablePath]],
  } as GetTableGridReturnType<T>;
};
