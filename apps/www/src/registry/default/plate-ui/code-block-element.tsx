'use client';

import React from 'react';

import { cn, withRef } from '@sewellstephens/cn';
import { useCodeBlockElementState } from '@sewellstephens/plate-code-block/react';
import { LateElement } from '@sewellstephens/plate-common/react';

import { CodeBlockCombobox } from './code-block-combobox';

import './code-block-element.css';

export const CodeBlockElement = withRef<typeof LateElement>(
  ({ children, className, ...props }, ref) => {
    const { element } = props;
    const state = useCodeBlockElementState({ element });

    return (
      <LateElement
        className={cn('relative py-1', state.className, className)}
        ref={ref}
        {...props}
      >
        <pre className="overflow-x-auto rounded-md bg-muted px-6 py-8 font-mono text-sm leading-[normal] [tab-size:2]">
          <code>{children}</code>
        </pre>

        {state.syntax && (
          <div
            className="absolute right-2 top-2 z-10 select-none"
            contentEditable={false}
          >
            <CodeBlockCombobox />
          </div>
        )}
      </LateElement>
    );
  }
);
