import type { TElement } from '@sewellstephens/slate';
import type { RenderElementProps } from 'slate-react';

export type TRenderElementProps<E extends TElement = TElement> = {
  element: E;
} & Omit<RenderElementProps, 'element'>;

export type RenderElementFn = (
  props: TRenderElementProps
) => React.ReactElement;
