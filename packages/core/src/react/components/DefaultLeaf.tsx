import React from 'react';

import type { LateRenderLeafProps } from '../plugin/LateRenderLeafProps';

export function DefaultLeaf({
  attributes,
  children,
  editor,
  leaf,
  nodeProps,
  text,
  ...props
}: LateRenderLeafProps) {
  return (
    <span {...attributes} {...props}>
      {children}
    </span>
  );
}
