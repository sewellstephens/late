import React from 'react';
import { ComboboxItemProps } from '@sewellstephens/plate-combobox';
import {
  EmojiItemData,
  KEY_EMOJI,
  TEmojiCombobox,
  useEmojiComboboxState,
} from '@sewellstephens/plate-emoji';

import { Combobox } from './combobox';

export function EmojiComboboxItem({ item }: ComboboxItemProps<EmojiItemData>) {
  const {
    data: { id, emoji },
  } = item;

  return (
    <div>
      {emoji} :{id}:
    </div>
  );
}

export function EmojiCombobox({
  pluginKey = KEY_EMOJI,
  id = pluginKey,
  ...props
}: TEmojiCombobox) {
  const { trigger, onSelectItem } = useEmojiComboboxState({ pluginKey });

  return (
    <Combobox
      id={id}
      trigger={trigger}
      controlled
      onSelectItem={onSelectItem as any}
      onRenderItem={EmojiComboboxItem}
      {...props}
    />
  );
}