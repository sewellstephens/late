import React from 'react';

import type { TMentionElement } from '@sewell_stephens/late-mention';

import { cn, withRef } from '@sewell_stephens/cn';
import { getHandler } from '@sewell_stephens/late-common';
import { LateElement, useElement } from '@sewell_stephens/late-common/react';
import { useFocused, useSelected } from 'slate-react';

export const MentionElement = withRef<
  typeof LateElement,
  {
    onClick?: (mentionNode: any) => void;
    prefix?: string;
    renderLabel?: (mentionable: TMentionElement) => string;
  }
>(({ children, className, onClick, prefix, renderLabel, ...props }, ref) => {
  const element = useElement<TMentionElement>();
  const selected = useSelected();
  const focused = useFocused();

  return (
    <LateElement
      className={cn(
        'inline-block cursor-pointer rounded-md bg-muted px-1.5 py-0.5 align-baseline text-sm font-medium',
        selected && focused && 'ring-2 ring-ring',
        element.children[0].bold === true && 'font-bold',
        element.children[0].italic === true && 'italic',
        element.children[0].underline === true && 'underline',
        className
      )}
      contentEditable={false}
      data-slate-value={element.value}
      onClick={getHandler(onClick, element)}
      ref={ref}
      {...props}
    >
      {prefix}
      {renderLabel ? renderLabel(element) : element.value}
      {children}
    </LateElement>
  );
});
