import React from 'react';
import { cn } from '@sewell_stephens/cn';
import { createZustandStore } from '@sewell_stephens/late-common';
import {
  CursorData,
  CursorOverlay as CursorOverlayPrimitive,
  CursorOverlayProps,
  CursorProps,
} from '@sewell_stephens/late-cursor';

export const cursorStore = createZustandStore('cursor')({
  cursors: {},
});

export function Cursor({
  data,
  selectionRects,
  caretPosition,
  disableCaret,
  disableSelection,
  classNames,
}: CursorProps<CursorData>) {
  if (!data) {
    return null;
  }

  const { style, selectionStyle = style } = data;

  return (
    <>
      {!disableSelection &&
        selectionRects.map((position, i) => (
          <div
            key={i}
            className={cn(
              'pointer-events-none absolute z-10 opacity-[0.3]',
              classNames?.selectionRect
            )}
            style={{
              ...selectionStyle,
              ...position,
            }}
          />
        ))}
      {!disableCaret && caretPosition && (
        <div
          className={cn(
            'pointer-events-none absolute z-10 w-0.5',
            classNames?.caret
          )}
          style={{ ...caretPosition, ...style }}
        />
      )}
    </>
  );
}

export function CursorOverlay({ cursors, ...props }: CursorOverlayProps) {
  const dynamicCursors = cursorStore.use.cursors();

  const allCursors = { ...cursors, ...dynamicCursors };

  return (
    <CursorOverlayPrimitive
      {...props}
      cursors={allCursors}
      onRenderCursor={Cursor}
    />
  );
}
