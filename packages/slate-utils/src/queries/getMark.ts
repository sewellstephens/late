import { type TEditor, getMarks } from '@sewell_stephens/slate';

/** Get selection mark value by key. */
export const getMark = (editor: TEditor, key: string) => {
  if (!editor) return;

  const marks = getMarks(editor);

  return (marks as any)?.[key] as unknown;
};
