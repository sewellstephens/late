import React from 'react';

import type { TText } from '@sewellstephens/slate';

import {
  type AnyLatePlugin,
  type LateRenderLeafProps,
  omitPluginContext,
} from '@sewellstephens/plate-core/react';
import { Text, type TextProps, useComposedRef } from '@sewellstephens/react-utils';
import { clsx } from 'clsx';

export type LateLeafProps<
  T extends TText = TText,
  P extends AnyLatePlugin = AnyLatePlugin,
> = {
  /** Get HTML attributes from Slate leaf. Alternative to `LatePlugin.props`. */
  leafToAttributes?: (leaf: T) => any;
} & LateRenderLeafProps<T, P> &
  TextProps;

export const useLateLeaf = (props: LateLeafProps) => {
  const { attributes, leaf, leafToAttributes, nodeProps, text, ...rootProps } =
    omitPluginContext(props);

  return {
    props: {
      ...attributes,
      ...rootProps,
      ...nodeProps,
      ...leafToAttributes?.(leaf),
      className: clsx(props.className, nodeProps?.className),
    },
    ref: useComposedRef(props.ref, (attributes as any).ref),
  };
};

/** Headless leaf component. */
const LateLeaf = React.forwardRef<HTMLSpanElement, LateLeafProps>(
  (props: LateLeafProps, ref) => {
    const { props: rootProps, ref: rootRef } = useLateLeaf({ ...props, ref });

    return <Text {...rootProps} ref={rootRef} />;
  }
) as (<N extends TText = TText, P extends AnyLatePlugin = AnyLatePlugin>({
  className,
  ...props
}: LateLeafProps<N, P> &
  React.RefAttributes<HTMLSpanElement>) => React.ReactElement) & {
  displayName?: string;
};
LateLeaf.displayName = 'LateLeaf';

export { LateLeaf };
