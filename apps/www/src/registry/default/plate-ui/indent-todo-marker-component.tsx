import type { LateRenderElementProps } from '@sewell_stephens/late-common/react';

import { cn } from '@sewell_stephens/cn';
import {
  useIndentTodoListElement,
  useIndentTodoListElementState,
} from '@sewell_stephens/late-indent-list/react';

import { Checkbox } from './checkbox';

export const TodoMarker = ({
  element,
}: Omit<LateRenderElementProps, 'children'>) => {
  const state = useIndentTodoListElementState({ element });
  const { checkboxProps } = useIndentTodoListElement(state);

  return (
    <div contentEditable={false}>
      <Checkbox
        style={{ left: -24, position: 'absolute', top: 4 }}
        {...checkboxProps}
      />
    </div>
  );
};

export const TodoLi = (props: LateRenderElementProps) => {
  const { children, element } = props;

  return (
    <span
      className={cn(
        (element.checked as boolean) && 'text-muted-foreground line-through'
      )}
    >
      {children}
    </span>
  );
};
