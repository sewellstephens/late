'use client';

import { cn, withRef } from '@sewell_stephens/cn';
import { setNodes } from '@sewell_stephens/late-common';
import { LateElement, findNodePath } from '@sewell_stephens/late-common/react';

import { Calendar } from './calendar';
import { Popover, PopoverContent, PopoverTrigger } from './popover';

export const DateElement = withRef<typeof LateElement>(
  ({ children, className, ...props }, ref) => {
    const { editor, element } = props;

    return (
      <LateElement
        className={cn('inline-block', className)}
        contentEditable={false}
        ref={ref}
        {...props}
      >
        <Popover>
          <PopoverTrigger asChild>
            <span
              className={cn(
                'w-fit cursor-pointer rounded-sm bg-muted px-1 text-muted-foreground'
              )}
              contentEditable={false}
            >
              {element.date ? (
                (() => {
                  const today = new Date();
                  const elementDate = new Date(element.date as string);
                  const isToday =
                    elementDate.getDate() === today.getDate() &&
                    elementDate.getMonth() === today.getMonth() &&
                    elementDate.getFullYear() === today.getFullYear();

                  const isYesterday =
                    new Date(
                      today.setDate(today.getDate() - 1)
                    ).toDateString() === elementDate.toDateString();
                  const isTomorrow =
                    new Date(
                      today.setDate(today.getDate() + 2)
                    ).toDateString() === elementDate.toDateString();

                  if (isToday) return 'Today';
                  if (isYesterday) return 'Yesterday';
                  if (isTomorrow) return 'Tomorrow';

                  return elementDate.toLocaleDateString(undefined, {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  });
                })()
              ) : (
                <span>Pick a date</span>
              )}
            </span>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              initialFocus
              mode="single"
              onSelect={(date) => {
                if (!date) return;

                setNodes(
                  editor,
                  { date: date.toDateString() },
                  { at: findNodePath(editor, element) }
                );
              }}
              selected={new Date(element.date as string)}
            />
          </PopoverContent>
        </Popover>
        {children}
      </LateElement>
    );
  }
);
