import {
  type SlateEditor,
  getChildren,
  getNodeString,
} from '@sewell_stephens/late-common';

import { getCodeLineEntry } from './getCodeLineEntry';

/** Is the selection inside an empty code block */
export const isCodeBlockEmpty = (editor: SlateEditor) => {
  const { codeBlock } = getCodeLineEntry(editor) ?? {};

  if (!codeBlock) return false;

  const codeLines = Array.from(getChildren(codeBlock));

  if (codeLines.length === 0) return true;
  if (codeLines.length > 1) return false;

  const firstCodeLineNode = codeLines[0][0];

  return !getNodeString(firstCodeLineNode);
};
