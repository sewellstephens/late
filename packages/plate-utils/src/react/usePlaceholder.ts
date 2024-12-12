import { useEditorRef } from '@sewellstephens/plate-core/react';
import {
  type QueryNodeOptions,
  isCollapsed,
  isElementEmpty,
  queryNode,
} from '@sewellstephens/slate';
import { findNodePath } from '@sewellstephens/slate-react';
import { useFocused, useSelected } from 'slate-react';

import type { PlateElementProps } from './PlateElement';

export interface PlaceholderProps extends PlateElementProps {
  placeholder: string;
  hideOnBlur?: boolean;
  query?: QueryNodeOptions;
}

export const usePlaceholderState = ({
  element,
  hideOnBlur = true,
  query,
}: PlaceholderProps) => {
  const focused = useFocused();
  const selected = useSelected();
  const editor = useEditorRef();

  const isEmptyBlock = isElementEmpty(editor, element);

  const enabled =
    isEmptyBlock &&
    (!query || queryNode([element, findNodePath(editor, element)!], query)) &&
    (!hideOnBlur ||
      (isCollapsed(editor.selection) && hideOnBlur && focused && selected));

  return {
    enabled,
  };
};
