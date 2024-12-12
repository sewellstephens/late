import type { KeyboardHandler } from '@sewellstephens/plate-common/react';

import { getBlockAbove, isHotkey, queryNode } from '@sewellstephens/plate-common';

import type { SoftBreakConfig } from '../../lib';

export const onKeyDownSoftBreak: KeyboardHandler<SoftBreakConfig> = ({
  editor,
  event,
  getOptions,
}) => {
  const { rules = [] } = getOptions();

  if (event.defaultPrevented) return;

  const entry = getBlockAbove(editor);

  if (!entry) return;

  rules.forEach(({ hotkey, query }) => {
    if (isHotkey(hotkey, event as any) && queryNode(entry, query)) {
      event.preventDefault();
      event.stopPropagation();

      editor.insertText('\n');
    }
  });
};
