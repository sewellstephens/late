import type React from 'react';

import type { TEditor } from '@sewell_stephens/slate';

import { isComposing } from '@sewell_stephens/slate-react';

import { Hotkeys as VanillaHotkeys, createHotkey } from '../../lib';

const createComposing =
  (key: string) =>
  (
    editor: TEditor,
    event: React.KeyboardEvent,
    {
      composing,
    }: {
      /** Ignore the event if composing. */
      composing?: boolean;
    } = {}
  ) => {
    if (!createHotkey(key)(event)) return false;
    if (!!composing !== isComposing(editor)) return false;

    return true;
  };

export const Hotkeys = {
  ...VanillaHotkeys,
  isTab: createComposing('tab'),
  isUntab: createComposing('untab'),
};
