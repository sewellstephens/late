import React from 'react';

import { withRef } from '@sewell_stephens/cn';
import { LateElement } from '@sewell_stephens/late-common/react';
import { useExcalidrawElement } from '@sewell_stephens/late-excalidraw/react';

export const ExcalidrawElement = withRef<typeof LateElement>(
  ({ nodeProps, ...props }, ref) => {
    const { children, element } = props;

    const { Excalidraw, excalidrawProps } = useExcalidrawElement({
      element,
    });

    return (
      <LateElement ref={ref} {...props}>
        <div contentEditable={false}>
          <div className="h-[600px]">
            {Excalidraw && (
              <Excalidraw {...nodeProps} {...(excalidrawProps as any)} />
            )}
          </div>
        </div>
        {children}
      </LateElement>
    );
  }
);
