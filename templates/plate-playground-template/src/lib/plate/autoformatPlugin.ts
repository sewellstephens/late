import { AutoformatPlugin } from '@sewellstephens/plate-autoformat';
import { PlatePlugin } from '@sewellstephens/plate-common';

import { autoformatRules } from '@/lib/plate/autoformatRules';

export const autoformatPlugin: Partial<PlatePlugin<AutoformatPlugin>> = {
  options: {
    rules: autoformatRules as any,
    enableUndoOnDelete: true,
  },
};
