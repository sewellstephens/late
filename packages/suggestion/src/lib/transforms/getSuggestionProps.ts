import type { SlateEditor } from '@sewell_stephens/late-common';

import { SUGGESTION_KEYS, SuggestionPlugin } from '../SuggestionPlugin';
import { getSuggestionKey } from '../utils/index';

export const getSuggestionCurrentUserKey = (editor: SlateEditor) => {
  const { currentUserId } = editor.getOptions(SuggestionPlugin);

  return getSuggestionKey(currentUserId!);
};

export const getSuggestionProps = (
  editor: SlateEditor,
  id: string,
  {
    suggestionDeletion,
    suggestionUpdate,
  }: {
    suggestionDeletion?: boolean;
    suggestionUpdate?: any;
  } = {}
) => {
  const res = {
    [SUGGESTION_KEYS.id]: id,
    [SuggestionPlugin.key]: true,
    [getSuggestionCurrentUserKey(editor)]: true,
  };

  if (suggestionDeletion) {
    res.suggestionDeletion = true;
  }
  if (suggestionUpdate) {
    res.suggestionUpdate = suggestionUpdate;
  }

  return res;
};
