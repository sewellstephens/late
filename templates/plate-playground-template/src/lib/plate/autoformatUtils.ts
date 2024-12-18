import { AutoformatBlockRule } from '@sewellstephens/plate-autoformat';
import {
  ELEMENT_CODE_BLOCK,
  ELEMENT_CODE_LINE,
} from '@sewellstephens/plate-code-block';
import {
  getParentNode,
  isElement,
  isType,
  LateEditor,
} from '@sewellstephens/plate-common';
import { toggleList, unwrapList } from '@sewellstephens/plate-list';

export const preFormat: AutoformatBlockRule['preFormat'] = (editor) =>
  unwrapList(editor);

export const format = (editor: LateEditor, customFormatting: any) => {
  if (editor.selection) {
    const parentEntry = getParentNode(editor, editor.selection);
    if (!parentEntry) return;
    const [node] = parentEntry;
    if (
      isElement(node) &&
      !isType(editor, node, ELEMENT_CODE_BLOCK) &&
      !isType(editor, node, ELEMENT_CODE_LINE)
    ) {
      customFormatting();
    }
  }
};

export const formatList = (editor: LateEditor, elementType: string) => {
  format(editor, () =>
    toggleList(editor, {
      type: elementType,
    })
  );
};

export const formatText = (editor: LateEditor, text: string) => {
  format(editor, () => editor.insertText(text));
};
