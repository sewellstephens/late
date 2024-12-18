import { toLatePlugin } from '@sewellstephens/plate-common/react';

import { SuggestionPlugin as BaseSuggestionPlugin } from '../lib/SuggestionPlugin';
import { useHooksSuggestion } from './useHooksSuggestion';

/** Enables support for suggestions in the editor. */
export const SuggestionPlugin = toLatePlugin(BaseSuggestionPlugin, {
  useHooks: useHooksSuggestion as any,
});
