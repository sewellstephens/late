import { type TEditor, getEndPoint, getStartPoint } from '@sewellstephens/slate';

import { focusEditor } from '../react-editor/index';

/** Focus an editor edge. */
export const focusEditorEdge = (
  editor: TEditor,
  {
    edge = 'start',
  }: {
    edge?: 'end' | 'start';
  } = {}
) => {
  const target =
    edge === 'start' ? getStartPoint(editor, []) : getEndPoint(editor, []);

  focusEditor(editor, target);
};
