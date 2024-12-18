import type { LateRenderElementProps } from '@sewellstephens/plate-common/react';
import type { TIndentElement } from '@sewellstephens/plate-indent';

export const FireMarker = (
  props: Omit<LateRenderElementProps, 'children'>
) => {
  const { element } = props;

  return (
    <div contentEditable={false}>
      <span style={{ left: -26, position: 'absolute', top: -1 }}>
        {(element as TIndentElement).indent % 2 === 0 ? '🔥' : '🚀'}
      </span>
    </div>
  );
};

export const FireLiComponent = (props: LateRenderElementProps) => {
  const { children } = props;

  return <span>{children}</span>;
};
