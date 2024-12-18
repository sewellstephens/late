import { type TEditor, getEndPoint, isEndPoint } from '@sewell_stephens/slate';
import { Path } from 'slate';

export const isDocumentEnd = (editor: TEditor) => {
  if (editor.selection) {
    const point = editor.selection.focus;
    const endPoint = getEndPoint(editor, []);

    return (
      endPoint.offset === 0 &&
      isEndPoint(editor, point, point) &&
      Path.equals(Path.next(Path.parent(point.path)), endPoint.path)
    );
  }

  return false;
};
