import React from 'react';

import { cn, withRef } from '@sewellstephens/cn';
import { LateElement } from '@sewellstephens/plate-common/react';
import {
  useTodoListElement,
  useTodoListElementState,
} from '@sewellstephens/plate-list/react';

import { Checkbox } from './checkbox';

export const TodoListElement = withRef<typeof LateElement>(
  ({ children, className, ...props }, ref) => {
    const { element } = props;
    const state = useTodoListElementState({ element });
    const { checkboxProps } = useTodoListElement(state);

    return (
      <LateElement
        className={cn('flex flex-row py-1', className)}
        ref={ref}
        {...props}
      >
        <div
          className="mr-1.5 flex select-none items-center justify-center"
          contentEditable={false}
        >
          <Checkbox {...checkboxProps} />
        </div>
        <span
          className={cn(
            'flex-1 focus:outline-none',
            state.checked && 'text-muted-foreground line-through'
          )}
          contentEditable={!state.readOnly}
          suppressContentEditableWarning
        >
          {children}
        </span>
      </LateElement>
    );
  }
);
