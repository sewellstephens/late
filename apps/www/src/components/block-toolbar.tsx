'use client';

import * as React from 'react';

import type { Block } from '@/registry/schema';
import type { ImperativePanelHandle } from 'react-resizable-panels';

import { Switch } from '@radix-ui/react-switch';
import { cn } from '@sewell_stephens/cn';
import { Maximize, Monitor, Smartphone, Tablet } from 'lucide-react';

import { useLiftMode } from '@/hooks/use-lift-mode';
import { trackEvent } from '@/lib/events';
import { Separator } from '@/registry/default/plate-ui/separator';

import { BlockCopyButton } from './block-copy-button';
import { Label } from './ui/label';
import { ToggleGroup, ToggleGroupItem } from './ui/toggle-group';

export function BlockToolbar({
  block,
  fullScreen,
  resizablePanelRef,
  setFullScreen,
}: {
  block: { hasLiftMode: boolean } & Block;
  fullScreen: boolean;
  resizablePanelRef: React.RefObject<ImperativePanelHandle>;
  setFullScreen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { isLiftMode, toggleLiftMode } = useLiftMode(block.name);

  return (
    <div
      className={cn(
        'flex flex-col items-center gap-4 sm:flex-row',
        'absolute right-0 z-[60]',
        !fullScreen && '-top-4 -translate-y-full',
        fullScreen && 'bottom-4'
      )}
    >
      <div className="flex items-center gap-2 pr-[14px] sm:ml-auto">
        {block.hasLiftMode && (
          <>
            <div className="flex h-7 items-center justify-between gap-2">
              <Label className="text-xs" htmlFor={`lift-mode-${block.name}`}>
                Lift Mode
              </Label>
              <Switch
                checked={isLiftMode}
                id={`lift-mode-${block.name}`}
                onCheckedChange={(value) => {
                  resizablePanelRef.current?.resize(100);
                  toggleLiftMode(block.name);

                  if (value) {
                    trackEvent({
                      name: 'enable_lift_mode',
                      properties: {
                        name: block.name,
                      },
                    });
                  }
                }}
              />
            </div>
            <Separator
              className="mx-2 hidden h-4 lg:inline-flex"
              orientation="vertical"
            />
          </>
        )}

        <div className="hidden h-[28px] items-center gap-1.5 rounded-md border bg-background p-[2px] shadow-sm md:flex">
          <ToggleGroup
            defaultValue="100"
            disabled={isLiftMode}
            onValueChange={(value) => {
              if (value === 'full') {
                setFullScreen(true);

                return;
              }
              if (fullScreen) {
                setFullScreen(false);
              }

              setTimeout(() => {
                if (resizablePanelRef.current) {
                  resizablePanelRef.current.resize(Number.parseInt(value));
                }
              }, 0);
            }}
            type="single"
          >
            <ToggleGroupItem
              className="size-[22px] rounded-sm p-0"
              value="full"
            >
              <Maximize className="!size-3.5" />
            </ToggleGroupItem>
            <ToggleGroupItem className="size-[22px] rounded-sm p-0" value="100">
              <Monitor className="!size-3.5" />
            </ToggleGroupItem>
            <ToggleGroupItem className="size-[22px] rounded-sm p-0" value="60">
              <Tablet className="!size-3.5" />
            </ToggleGroupItem>
            <ToggleGroupItem className="size-[22px] rounded-sm p-0" value="30">
              <Smartphone className="!size-3.5" />
            </ToggleGroupItem>
          </ToggleGroup>
        </div>

        {block.code && (
          <>
            <Separator
              className="mx-2 hidden h-4 md:flex"
              orientation="vertical"
            />
            <BlockCopyButton
              code={block.code}
              disabled={isLiftMode}
              event="copy_block_code"
              name={block.name}
            />
          </>
        )}
      </div>
    </div>
  );
}
