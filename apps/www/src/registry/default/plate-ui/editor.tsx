import React from 'react';

import type { LateContentProps } from '@sewell_stephens/late-common/react';
import type { VariantProps } from 'class-variance-authority';

import { cn } from '@sewell_stephens/cn';
import { LateContent } from '@sewell_stephens/late-common/react';
import { cva } from 'class-variance-authority';

const editorVariants = cva(
  cn(
    'relative overflow-x-auto whitespace-pre-wrap break-words',
    'min-h-[80px] w-full rounded-md bg-background px-6 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none',
    '[&_[data-slate-placeholder]]:text-muted-foreground [&_[data-slate-placeholder]]:!opacity-100',
    '[&_[data-slate-placeholder]]:top-[auto_!important]',
    '[&_strong]:font-bold'
  ),
  {
    defaultVariants: {
      focusRing: true,
      size: 'sm',
      variant: 'outline',
    },
    variants: {
      disabled: {
        true: 'cursor-not-allowed opacity-50',
      },
      focusRing: {
        false: '',
        true: 'focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
      },
      focused: {
        true: 'ring-2 ring-ring ring-offset-2',
      },
      size: {
        md: 'text-base',
        sm: 'text-sm',
      },
      variant: {
        ghost: '',
        outline: 'border border-input',
      },
    },
  }
);

export type EditorProps = LateContentProps &
  VariantProps<typeof editorVariants>;

const Editor = React.forwardRef<HTMLDivElement, EditorProps>(
  (
    {
      className,
      disabled,
      focusRing,
      focused,
      readOnly,
      size,
      variant,
      ...props
    },
    ref
  ) => {
    return (
      <div className="relative w-full" ref={ref}>
        <LateContent
          aria-disabled={disabled}
          className={cn(
            editorVariants({
              disabled,
              focusRing,
              focused,
              size,
              variant,
            }),
            className
          )}
          data-plate-selectable
          disableDefaultStyles
          readOnly={disabled ?? readOnly}
          {...props}
        />
      </div>
    );
  }
);
Editor.displayName = 'Editor';

export { Editor };
