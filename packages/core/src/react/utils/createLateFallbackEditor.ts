import {
  type CreateLateEditorOptions,
  createLateEditor,
} from '../editor/withLate';

export const createLateFallbackEditor = (
  options: CreateLateEditorOptions = {}
) => {
  const editor = createLateEditor(options);

  editor.isFallback = true;

  editor.apply = () => {
    throw new Error(
      'Cannot apply operations on the fallback editor. The fallback editor is used when a hook that depends on the Late store was unable to locate a valid store. If you are using LateController, use `useEditorMounted(id?: string)` or `!editor.isFallback` to ensure that a valid Late store is available before attempting to call operations on the editor.'
    );
  };

  return editor;
};
