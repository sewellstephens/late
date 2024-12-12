import type { KeyboardHandler } from '@sewellstephens/plate-common/react';

import { Hotkeys } from '@sewellstephens/plate-common';

export const onKeyDownSingleLine: KeyboardHandler = ({ event }) => {
  if (event.defaultPrevented) return;
  if (Hotkeys.isSplitBlock(event)) {
    event.preventDefault();
  }
};
