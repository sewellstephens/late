import React from 'react';

import type { LateRenderElementProps } from '@sewellstephens/plate-core/react';

export const createNodeHOC =
  <T,>(HOC: React.FC<T>) =>
  (Component: any, props: Omit<T, keyof LateRenderElementProps>) =>
    function hoc(childrenProps: LateRenderElementProps) {
      return (
        <HOC {...({ ...childrenProps, ...props } as T)}>
          <Component {...childrenProps} />
        </HOC>
      );
    };
