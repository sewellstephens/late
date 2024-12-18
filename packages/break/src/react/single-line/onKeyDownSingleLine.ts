import type { KeyboardHandler } from '@sewell_stephens/late-common/react';

import { Hotkeys } from '@sewell_stephens/late-common';

export const onKeyDownSingleLine: KeyboardHandler = ({ event }) => {
  if (event.defaultPrevented) return;
  if (Hotkeys.isSplitBlock(event)) {
    event.preventDefault();
  }
};
