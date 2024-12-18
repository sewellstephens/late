import React from 'react';

import type { TElement } from '@sewellstephens/slate';

import {
  type AnyLatePlugin,
  type LateRenderElementProps,
  omitPluginContext,
} from '@sewellstephens/plate-core/react';
import { Box, type BoxProps, useComposedRef } from '@sewellstephens/react-utils';
import { clsx } from 'clsx';

export type LateElementProps<
  N extends TElement = TElement,
  P extends AnyLatePlugin = AnyLatePlugin,
> = {
  /** Get HTML attributes from Slate element. Alternative to `LatePlugin.props`. */
  elementToAttributes?: (element: N) => any;
} & BoxProps &
  LateRenderElementProps<N, P>;

export const useLateElement = (props: LateElementProps) => {
  const { attributes, element, elementToAttributes, nodeProps, ...rootProps } =
    omitPluginContext(props);

  return {
    props: {
      ...attributes,
      ...rootProps,
      ...nodeProps,
      ...elementToAttributes?.(element),
      className: clsx(props.className, nodeProps?.className),
    },
    ref: useComposedRef(props.ref, attributes.ref),
  };
};

/** Headless element component. */
const LateElement = React.forwardRef<HTMLDivElement, LateElementProps>(
  (props: LateElementProps, ref) => {
    const { props: rootProps, ref: rootRef } = useLateElement({
      ...props,
      ref,
    });

    return <Box {...rootProps} ref={rootRef} />;
  }
) as (<
  N extends TElement = TElement,
  P extends AnyLatePlugin = AnyLatePlugin,
>(
  props: LateElementProps<N, P> & React.RefAttributes<HTMLDivElement>
) => React.ReactElement) & { displayName?: string };
LateElement.displayName = 'LateElement';

export { LateElement };
