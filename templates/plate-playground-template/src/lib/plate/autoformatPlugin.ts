import { AutoformatPlugin } from '@sewellstephens/plate-autoformat';
import { LatePlugin } from '@sewellstephens/plate-common';

import { autoformatRules } from '@/lib/plate/autoformatRules';

export const autoformatPlugin: Partial<LatePlugin<AutoformatPlugin>> = {
  options: {
    rules: autoformatRules as any,
    enableUndoOnDelete: true,
  },
};
