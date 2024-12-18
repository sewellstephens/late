import React from 'react';

import type { AnyObject } from '@sewellstephens/plate-common';
import type { LateRenderElementProps } from '@sewellstephens/plate-common/react';

import {
  type WithDraggableOptions,
  useWithDraggable,
} from './useWithDraggable';

export const withDraggable = <T extends AnyObject = AnyObject>(
  Draggable: React.FC<any>,
  Component: React.FC<any>,
  options?: WithDraggableOptions<T>
) =>
  // eslint-disable-next-line react/display-name
  React.forwardRef<HTMLDivElement, LateRenderElementProps>((props, ref) => {
    const { disabled, draggableProps } = useWithDraggable({
      ...options,
      ...props,
    });

    if (disabled) {
      return <Component {...props} />;
    }

    return (
      <Draggable ref={ref} {...draggableProps}>
        <Component {...props} />
      </Draggable>
    );
  });
