'use client';

import './code-block-element.css';

import React from 'react';
import { cn, withRef } from '@sewell_stephens/cn';
import { useCodeBlockElementState } from '@sewell_stephens/late-code-block';
import { LateElement } from '@sewell_stephens/late-common';

import { CodeBlockCombobox } from './code-block-combobox';

export const CodeBlockElement = withRef<typeof LateElement>(
  ({ className, children, ...props }, ref) => {
    const { element } = props;
    const state = useCodeBlockElementState({ element });

    return (
      <LateElement
        ref={ref}
        className={cn('relative py-1', state.className, className)}
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
