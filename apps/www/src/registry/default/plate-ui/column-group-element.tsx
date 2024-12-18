import React from 'react';

import type { TColumnElement } from '@sewellstephens/plate-layout';

import { cn, withRef } from '@sewellstephens/cn';
import {
  LateElement,
  useElement,
  useRemoveNodeButton,
} from '@sewellstephens/plate-common/react';
import {
  ColumnItemPlugin,
  useColumnState,
  useDebouncePopoverOpen,
} from '@sewellstephens/plate-layout/react';
import { useReadOnly } from 'slate-react';

import { Icons } from '@/components/icons';

import { Button } from './button';
import { Popover, PopoverAnchor, PopoverContent } from './popover';
import { Separator } from './separator';

export const ColumnGroupElement = withRef<typeof LateElement>(
  ({ children, className, ...props }, ref) => {
    return (
      <LateElement className={cn(className, 'my-2')} ref={ref} {...props}>
        <ColumnFloatingToolbar>
          <div className={cn('flex size-full gap-4 rounded')}>{children}</div>
        </ColumnFloatingToolbar>
      </LateElement>
    );
  }
);

export function ColumnFloatingToolbar({ children }: React.PropsWithChildren) {
  const readOnly = useReadOnly();

  const {
    setDoubleColumn,
    setDoubleSideDoubleColumn,
    setLeftSideDoubleColumn,
    setRightSideDoubleColumn,
    setThreeColumn,
  } = useColumnState();

  const element = useElement<TColumnElement>(ColumnItemPlugin.key);

  const { props: buttonProps } = useRemoveNodeButton({ element });

  const isOpen = useDebouncePopoverOpen();

  if (readOnly) return <>{children}</>;

  return (
    <Popover modal={false} open={isOpen}>
      <PopoverAnchor>{children}</PopoverAnchor>
      <PopoverContent
        align="center"
        className="w-auto p-1"
        onOpenAutoFocus={(e) => e.preventDefault()}
        side="top"
        sideOffset={10}
      >
        <div className="box-content flex h-9 items-center gap-1 [&_svg]:size-4 [&_svg]:text-muted-foreground">
          <Button onClick={setDoubleColumn} size="sms" variant="ghost">
            <Icons.doubleColumn />
          </Button>
          <Button onClick={setThreeColumn} size="sms" variant="ghost">
            <Icons.threeColumn />
          </Button>
          <Button onClick={setRightSideDoubleColumn} size="sms" variant="ghost">
            <Icons.rightSideDoubleColumn />
          </Button>
          <Button onClick={setLeftSideDoubleColumn} size="sms" variant="ghost">
            <Icons.leftSideDoubleColumn />
          </Button>
          <Button
            onClick={setDoubleSideDoubleColumn}
            size="sms"
            variant="ghost"
          >
            <Icons.doubleSideDoubleColumn />
          </Button>

          <Separator className="my-1" orientation="vertical" />
          <Button size="sms" variant="ghost" {...buttonProps}>
            <Icons.delete />
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
