import React, { useMemo, useState } from 'react';

import { withRef } from '@sewell_stephens/cn';
import { LateElement } from '@sewell_stephens/late-common/react';
import { EmojiInlineIndexSearch, insertEmoji } from '@sewell_stephens/late-emoji';

import { useDebounce } from '@/hooks/use-debounce';

import {
  InlineCombobox,
  InlineComboboxContent,
  InlineComboboxEmpty,
  InlineComboboxInput,
  InlineComboboxItem,
} from './inline-combobox';

export const EmojiInputElement = withRef<typeof LateElement>(
  ({ className, ...props }, ref) => {
    const { children, editor, element } = props;
    const [value, setValue] = useState('');
    const debouncedValue = useDebounce(value, 100);
    const isPending = value !== debouncedValue;

    const filteredEmojis = useMemo(() => {
      if (debouncedValue.trim().length === 0) return [];

      return EmojiInlineIndexSearch.getInstance()
        .search(debouncedValue.replace(/:$/, ''))
        .get();
    }, [debouncedValue]);

    return (
      <LateElement
        as="span"
        data-slate-value={element.value}
        ref={ref}
        {...props}
      >
        <InlineCombobox
          element={element}
          filter={false}
          hideWhenNoValue
          setValue={setValue}
          trigger=":"
          value={value}
        >
          <InlineComboboxInput />

          <InlineComboboxContent>
            {!isPending && (
              <InlineComboboxEmpty>No matching emoji found</InlineComboboxEmpty>
            )}

            {filteredEmojis.map((emoji) => (
              <InlineComboboxItem
                key={emoji.id}
                onClick={() => insertEmoji(editor, emoji)}
                value={emoji.name}
              >
                {emoji.skins[0].native} {emoji.name}
              </InlineComboboxItem>
            ))}
          </InlineComboboxContent>
        </InlineCombobox>

        {children}
      </LateElement>
    );
  }
);
