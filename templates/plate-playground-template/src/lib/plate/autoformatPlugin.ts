import { AutoformatPlugin } from '@sewell_stephens/late-autoformat';
import { LatePlugin } from '@sewell_stephens/late-common';

import { autoformatRules } from '@/lib/plate/autoformatRules';

export const autoformatPlugin: Partial<LatePlugin<AutoformatPlugin>> = {
  options: {
    rules: autoformatRules as any,
    enableUndoOnDelete: true,
  },
};
