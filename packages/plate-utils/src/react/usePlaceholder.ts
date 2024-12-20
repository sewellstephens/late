import { useEditorRef } from '@sewell_stephens/late-core/react';
import {
  type QueryNodeOptions,
  isCollapsed,
  isElementEmpty,
  queryNode,
} from '@sewell_stephens/slate';
import { findNodePath } from '@sewell_stephens/slate-react';
import { useFocused, useSelected } from 'slate-react';

import type { LateElementProps } from './LateElement';

export interface PlaceholderProps extends LateElementProps {
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
