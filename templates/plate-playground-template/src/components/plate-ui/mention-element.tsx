import React from 'react';
import { cn, withRef } from '@sewell_stephens/cn';
import {
  getHandler,
  LateElement,
  useElement,
} from '@sewell_stephens/late-common/react';
import { TMentionElement } from '@sewell_stephens/late-mention';
import { useFocused, useSelected } from 'slate-react';

export const MentionElement = withRef<
  typeof LateElement,
  {
    prefix?: string;
    onClick?: (mentionNode: any) => void;
    renderLabel?: (mentionable: TMentionElement) => string;
  }
>(({ children, prefix, renderLabel, className, onClick, ...props }, ref) => {
  const element = useElement<TMentionElement>();
  const selected = useSelected();
  const focused = useFocused();

  return (
    <LateElement
      ref={ref}
      className={cn(
        'inline-block cursor-pointer rounded-md bg-muted px-1.5 py-0.5 align-baseline text-sm font-medium',
        selected && focused && 'ring-2 ring-ring',
        element.children[0].bold === true && 'font-bold',
        element.children[0].italic === true && 'italic',
        element.children[0].underline === true && 'underline',
        className
      )}
      data-slate-value={element.value}
      contentEditable={false}
      onClick={getHandler(onClick, element)}
      {...props}
    >
      {prefix}
      {renderLabel ? renderLabel(element) : element.value}
      {children}
    </LateElement>
  );
});
