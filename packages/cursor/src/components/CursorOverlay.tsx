import React from 'react';

import type { ClassNames, UnknownObject } from '@sewellstephens/plate-common';

import { useLateSelectors } from '@sewellstephens/plate-common/react';

import type {
  CursorData,
  CursorOverlayState,
  CursorState,
  SelectionRect,
} from '../types';

import { useCursorOverlayPositions } from '../hooks/useCursorOverlayPositions';

export interface CursorProps<TCursorData extends UnknownObject = UnknownObject>
  extends CursorOverlayState<TCursorData>,
    ClassNames<{
      caret: string;
      selectionRect: string;
    }> {
  /** Whether to disable the caret. */
  disableCaret?: boolean;

  /** Whether to disable the selection rects. */
  disableSelection?: boolean;

  /**
   * Custom caret component. For example, you could display a label next to the
   * caret.
   *
   * @default styled div
   */
  onRenderCaret?: React.FC<
    Pick<CursorProps<TCursorData>, 'caretPosition' | 'data'>
  >;

  /** Overrides `Caret` component */
  onRenderSelectionRect?: React.FC<
    {
      selectionRect: SelectionRect;
    } & Pick<CursorProps<TCursorData>, 'data'>
  >;
}

export interface CursorOverlayProps<
  TCursorData extends UnknownObject = UnknownObject,
> extends Pick<
    CursorProps<CursorData>,
    | 'classNames'
    | 'disableCaret'
    | 'disableSelection'
    | 'onRenderCaret'
    | 'onRenderSelectionRect'
  > {
  /**
   * Container the overlay will be rendered in. If set, all returned overlay
   * positions will be relative to this container.
   */
  containerRef?: React.RefObject<HTMLElement>;

  /** Cursor states to use for calculating the overlay positions, by key. */
  cursors?: Record<string, CursorState<TCursorData>>;

  /** Overrides `Cursor` component. */
  onRenderCursor?: React.FC<CursorProps>;

  /**
   * Whether to refresh the cursor overlay positions on container resize.
   *
   * @default true
   */
  refreshOnResize?: boolean;
}

export function CursorOverlayContent<
  TCursorData extends UnknownObject = UnknownObject,
>({
  classNames,
  onRenderCaret,
  onRenderCursor: CursorComponent,
  onRenderSelectionRect,
  ...props
}: CursorOverlayProps<TCursorData>) {
  const { disableCaret, disableSelection } = props;

  const { cursors } = useCursorOverlayPositions(props);

  const cursorProps = {
    classNames,
    disableCaret,
    disableSelection,
    onRenderCaret,
    onRenderSelectionRect,
  };

  if (!CursorComponent) return null;

  return (
    <>
      {cursors.map((cursor) => (
        <CursorComponent key={cursor.key} {...cursorProps} {...cursor} />
      ))}
    </>
  );
}

export function CursorOverlay<
  TCursorData extends UnknownObject = UnknownObject,
>(props: CursorOverlayProps<TCursorData>) {
  const isMounted = useLateSelectors().isMounted();

  if (!isMounted) return null;

  return <CursorOverlayContent {...props} />;
}
