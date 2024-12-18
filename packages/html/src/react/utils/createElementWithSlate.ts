import React from 'react';

import {
  Late,
  LateContent,
  type LateProps,
} from '@sewell_stephens/late-common/react';

/** Create a React element wrapped in a Late provider. */
export const createElementWithSlate = (
  plateProps?: Partial<LateProps>,
  dndWrapper?: React.ComponentClass | React.FC | string
) => {
  const { children, editor, onChange = () => {}, ...props } = plateProps || {};

  const plateContent = React.createElement(LateContent, {
    renderEditable: () => children,
  });

  const plate = React.createElement(
    Late,
    {
      editor,
      onChange,
      ...props,
    } as LateProps,
    plateContent
  );

  if (dndWrapper) {
    return React.createElement(dndWrapper, null, plate);
  }

  return plate;
};
