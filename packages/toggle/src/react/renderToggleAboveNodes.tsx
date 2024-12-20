import React from 'react';

import type {
  NodeWrapperComponent,
  NodeWrapperComponentReturnType,
} from '@sewell_stephens/late-common/react';

import { useIsVisible } from './toggleIndexAtom';

export const renderToggleAboveNodes: NodeWrapperComponent<any> = () =>
  ToggleAboveNodes;

const ToggleAboveNodes: NodeWrapperComponentReturnType = ({
  children,
  element,
}) => {
  const isVisible = useIsVisible(element.id as string);

  if (isVisible) return children;

  return <div style={hiddenStyle}>{children}</div>;
};

const hiddenStyle: React.CSSProperties = {
  height: 0,
  margin: 0,
  overflow: 'hidden',
  visibility: 'hidden',
};
