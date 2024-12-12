import React from 'react';

import { cn } from '@sewellstephens/cn';
import { ParagraphPlugin } from '@sewellstephens/plate-common/react';
import {
  type PlaceholderProps,
  createNodeHOC,
  createNodesHOC,
  usePlaceholderState,
} from '@sewellstephens/plate-common/react';
import { HEADING_KEYS } from '@sewellstephens/plate-heading';

export const Placeholder = (props: PlaceholderProps) => {
  const { children, nodeProps, placeholder } = props;

  const { enabled } = usePlaceholderState(props);

  return React.Children.map(children, (child) => {
    return React.cloneElement(child, {
      className: child.props.className,
      nodeProps: {
        ...nodeProps,
        className: cn(
          enabled &&
            'before:absolute before:cursor-text before:opacity-30 before:content-[attr(placeholder)]'
        ),
        placeholder,
      },
    });
  });
};

export const withPlaceholder = createNodeHOC(Placeholder);

export const withPlaceholdersPrimitive = createNodesHOC(Placeholder);

export const withPlaceholders = (components: any) =>
  withPlaceholdersPrimitive(components, [
    {
      hideOnBlur: true,
      key: ParagraphPlugin.key,
      placeholder: 'Type a paragraph',
      query: {
        maxLevel: 1,
      },
    },
    {
      hideOnBlur: false,
      key: HEADING_KEYS.h1,
      placeholder: 'Untitled',
    },
  ]);
