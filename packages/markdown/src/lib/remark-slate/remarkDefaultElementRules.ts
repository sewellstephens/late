import type { TDescendant, TElement, TText } from '@sewellstephens/plate-common';

import type { MdastNode, RemarkElementRules } from './types';

import { remarkTransformElementChildren } from './remarkTransformElementChildren';

// FIXME: underline, subscript superscript not yet supported by remark-slate
export const remarkDefaultElementRules: RemarkElementRules = {
  blockquote: {
    transform: (node, options) => {
      return {
        children: node.children!.flatMap((paragraph) =>
          remarkTransformElementChildren(paragraph, options)
        ),
        type: options.editor.getType({ key: 'blockquote' }),
      };
    },
  },
  code: {
    transform: (node, options) => ({
      children: (node.value || '').split('\n').map((line) => ({
        children: [{ text: line } as TText],
        type: options.editor.getType({ key: 'code_line' }),
      })),
      lang: node.lang ?? undefined,
      type: options.editor.getType({ key: 'code_block' }),
    }),
  },
  heading: {
    transform: (node, options) => {
      const headingType = {
        1: 'h1',
        2: 'h2',
        3: 'h3',
        4: 'h4',
        5: 'h5',
        6: 'h6',
      }[node.depth ?? 1];

      return {
        children: remarkTransformElementChildren(node, options),
        type: options.editor.getType({ key: headingType }),
      };
    },
  },
  image: {
    transform: (node, options) => ({
      caption: [{ text: node.alt } as TText],
      children: [{ text: '' } as TText],
      type: options.editor.getType({ key: 'img' }),
      url: node.url,
    }),
  },
  link: {
    transform: (node, options) => ({
      children: remarkTransformElementChildren(node, options),
      type: options.editor.getType({ key: 'a' }),
      url: node.url,
    }),
  },
  list: {
    transform: (node, options) => {
      if (options.indentList) {
        const listStyleType = node.ordered ? 'decimal' : 'disc';

        const parseListItems = (
          _node: MdastNode,
          listItems: TElement[] = [],
          indent = 1
        ) => {
          _node.children!.forEach((listItem) => {
            const [paragraph, ...subLists] = listItem.children!;

            listItems.push({
              children: remarkTransformElementChildren(
                paragraph || '',
                options
              ),
              indent,
              listStyleType,
              type: options.editor.getType({ key: 'p' }),
            });

            subLists.forEach((subList) => {
              parseListItems(subList, listItems, indent + 1);
            });
          });

          return listItems;
        };

        return parseListItems(node);
      } else {
        return {
          children: remarkTransformElementChildren(node, options),
          type: options.editor.getType({ key: node.ordered ? 'ol' : 'ul' }),
        };
      }
    },
  },
  listItem: {
    transform: (node, options) => ({
      children: remarkTransformElementChildren(node, options).map(
        (child) =>
          ({
            ...child,
            type:
              child.type === options.editor.getType({ key: 'p' })
                ? options.editor.getType({ key: 'lic' })
                : child.type,
          }) as TDescendant
      ),
      type: options.editor.getType({ key: 'li' }),
    }),
  },
  paragraph: {
    transform: (node, options) => {
      const children = remarkTransformElementChildren(node, options);

      const paragraphType = options.editor.getType({ key: 'p' });
      const splitBlockTypes = new Set([options.editor.getType({ key: 'img' })]);

      const elements: TElement[] = [];
      let inlineNodes: TDescendant[] = [];

      const flushInlineNodes = () => {
        if (inlineNodes.length > 0) {
          elements.push({
            children: inlineNodes,
            type: paragraphType,
          });

          inlineNodes = [];
        }
      };

      children.forEach((child) => {
        const { type } = child;

        if (type && splitBlockTypes.has(type as string)) {
          flushInlineNodes();
          elements.push(child as TElement);
        } else {
          inlineNodes.push(child);
        }
      });

      flushInlineNodes();

      return elements;
    },
  },
  thematicBreak: {
    transform: (node, options) => ({
      children: [{ text: '' } as TText],
      type: options.editor.getType({ key: 'hr' }),
    }),
  },
};
