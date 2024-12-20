import type { KeyboardHandler } from '@sewell_stephens/late-common/react';

import { getBlockAbove, isHotkey, queryNode } from '@sewell_stephens/late-common';

import type { ExitBreakConfig } from '../../lib/exit-break/types';

import { exitBreak } from '../../lib/exit-break/transforms/exitBreak';

export const onKeyDownExitBreak: KeyboardHandler<ExitBreakConfig> = ({
  editor,
  event,
  getOptions,
}) => {
  const { rules = [] } = getOptions();

  if (event.defaultPrevented) return;

  const entry = getBlockAbove(editor);

  if (!entry) return;

  rules.forEach(({ hotkey, ...rule }) => {
    if (
      isHotkey(hotkey, event as any) &&
      queryNode(entry, rule.query) &&
      exitBreak(editor, rule)
    ) {
      event.preventDefault();
      event.stopPropagation();
    }
  });
};
