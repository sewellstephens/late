import React from 'react';
import { cn, withRef } from '@sewell_stephens/cn';
import { LateElement, withHOC } from '@sewell_stephens/late-common';
import { ELEMENT_IMAGE, Image, useMediaState } from '@sewell_stephens/late-media';
import { ResizableProvider, useResizableStore } from '@sewell_stephens/late-resizable';

import { Caption, CaptionTextarea } from './caption';
import { MediaPopover } from './media-popover';
import {
  mediaResizeHandleVariants,
  Resizable,
  ResizeHandle,
} from './resizable';

export const ImageElement = withHOC(
  ResizableProvider,
  withRef<typeof LateElement>(
    ({ className, children, nodeProps, ...props }, ref) => {
      const { readOnly, focused, selected, align = 'center' } = useMediaState();
      const width = useResizableStore().get.width();

      return (
        <MediaPopover pluginKey={ELEMENT_IMAGE}>
          <LateElement
            ref={ref}
            className={cn('py-2.5', className)}
            {...props}
          >
            <figure className="group relative m-0" contentEditable={false}>
              <Resizable
                align={align}
                options={{
                  align,
                  readOnly,
                }}
              >
                <ResizeHandle
                  options={{ direction: 'left' }}
                  className={mediaResizeHandleVariants({ direction: 'left' })}
                />
                <Image
                  className={cn(
                    'block w-full max-w-full cursor-pointer object-cover px-0',
                    'rounded-sm',
                    focused && selected && 'ring-2 ring-ring ring-offset-2'
                  )}
                  alt=""
                  {...nodeProps}
                />
                <ResizeHandle
                  options={{ direction: 'right' }}
                  className={mediaResizeHandleVariants({ direction: 'right' })}
                />
              </Resizable>

              <Caption align={align} style={{ width }}>
                <CaptionTextarea
                  placeholder="Write a caption..."
                  readOnly={readOnly}
                />
              </Caption>
            </figure>

            {children}
          </LateElement>
        </MediaPopover>
      );
    }
  )
);
