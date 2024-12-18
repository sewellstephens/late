'use client';

import React from 'react';

import type { DropdownMenuProps } from '@radix-ui/react-dropdown-menu';

import { BlockquotePlugin } from '@sewell_stephens/late-block-quote/react';
import {
  CodeBlockPlugin,
  insertEmptyCodeBlock,
} from '@sewell_stephens/late-code-block';
import { ParagraphPlugin, insertEmptyElement } from '@sewell_stephens/late-common';
import { focusEditor } from '@sewell_stephens/late-common/react';
import { ExcalidrawPlugin } from '@sewell_stephens/late-excalidraw/react';
import { HEADING_KEYS } from '@sewell_stephens/late-heading';
import { HorizontalRulePlugin } from '@sewell_stephens/late-horizontal-rule/react';
import { toggleIndentList } from '@sewell_stephens/late-indent-list';
import { IndentListPlugin } from '@sewell_stephens/late-indent-list/react';
import { insertColumnGroup } from '@sewell_stephens/late-layout';
import { ColumnPlugin } from '@sewell_stephens/late-layout/react';
import { LinkPlugin, triggerFloatingLink } from '@sewell_stephens/late-link/react';
import { insertMedia } from '@sewell_stephens/late-media';
import { ImagePlugin, MediaEmbedPlugin } from '@sewell_stephens/late-media/react';
import { TablePlugin, insertTable } from '@sewell_stephens/late-table/react';

import { settingsStore } from '@/components/context/settings-store';
import { Icons } from '@/components/icons';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  useOpenState,
} from '@/registry/default/plate-ui/dropdown-menu';
import { ToolbarButton } from '@/registry/default/plate-ui/toolbar';
import { useMyEditorRef } from '@/types/plate-types';

const items = [
  {
    items: [
      {
        description: 'Paragraph',
        icon: Icons.paragraph,
        label: 'Paragraph',
        value: ParagraphPlugin.key,
      },
      {
        description: 'Heading 1',
        icon: Icons.h1,
        label: 'Heading 1',
        value: HEADING_KEYS.h1,
      },
      {
        description: 'Heading 2',
        icon: Icons.h2,
        label: 'Heading 2',
        value: HEADING_KEYS.h2,
      },
      {
        description: 'Heading 3',
        icon: Icons.h3,
        label: 'Heading 3',
        value: HEADING_KEYS.h3,
      },
      {
        description: 'Heading 4',
        icon: Icons.h4,
        label: 'Heading 4',
        value: HEADING_KEYS.h4,
      },
      {
        description: 'Heading 5',
        icon: Icons.h5,
        label: 'Heading 5',
        value: HEADING_KEYS.h5,
      },
      {
        description: 'Heading 6',
        icon: Icons.h6,
        label: 'Heading 6',
        value: HEADING_KEYS.h6,
      },
      {
        description: 'Table',
        icon: Icons.table,
        label: 'Table',
        value: TablePlugin.key,
      },
      {
        description: 'Bulleted list',
        icon: Icons.ul,
        label: 'Bulleted list',
        value: 'ul',
      },
      {
        description: 'Numbered list',
        icon: Icons.ol,
        label: 'Numbered list',
        value: 'ol',
      },
      {
        description: 'Quote (⌘+⇧+.)',
        icon: Icons.blockquote,
        label: 'Quote',
        value: BlockquotePlugin.key,
      },
      {
        description: 'Divider (---)',
        icon: Icons.hr,
        label: 'Divider',
        value: HorizontalRulePlugin.key,
      },
      {
        description: 'Columns',
        icon: Icons.LayoutIcon,
        label: 'Columns',
        value: ColumnPlugin.key,
      },
    ],
    label: 'Basic blocks',
  },
  {
    items: [
      {
        description: 'Code (```)',
        icon: Icons.codeblock,
        label: 'Code',
        value: CodeBlockPlugin.key,
      },
      {
        description: 'Image',
        icon: Icons.image,
        label: 'Image',
        value: ImagePlugin.key,
      },
      {
        description: 'Embed',
        icon: Icons.embed,
        label: 'Embed',
        value: MediaEmbedPlugin.key,
      },
      {
        description: 'Excalidraw',
        icon: Icons.excalidraw,
        label: 'Excalidraw',
        value: ExcalidrawPlugin.key,
      },
    ],
    label: 'Media',
  },
  {
    items: [
      {
        description: 'Link',
        icon: Icons.link,
        label: 'Link',
        value: LinkPlugin.key,
      },
    ],
    label: 'Inline',
  },
];

export function PlaygroundInsertDropdownMenu(props: DropdownMenuProps) {
  const editor = useMyEditorRef();
  const openState = useOpenState();

  return (
    <DropdownMenu modal={false} {...openState} {...props}>
      <DropdownMenuTrigger asChild>
        <ToolbarButton isDropdown pressed={openState.open} tooltip="Insert">
          <Icons.add />
        </ToolbarButton>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="start"
        className="flex max-h-[500px] min-w-0 flex-col gap-0.5 overflow-y-auto"
      >
        {items.map(({ items: nestedItems, label }, index) => (
          <React.Fragment key={label}>
            {index !== 0 && <DropdownMenuSeparator />}

            <DropdownMenuLabel>{label}</DropdownMenuLabel>
            {nestedItems.map(
              ({ icon: Icon, label: itemLabel, value: type }) => (
                <DropdownMenuItem
                  className="min-w-[180px]"
                  key={type}
                  onSelect={async () => {
                    switch (type) {
                      case ColumnPlugin.key: {
                        insertColumnGroup(editor);

                        break;
                      }
                      case CodeBlockPlugin.key: {
                        insertEmptyCodeBlock(editor);

                        break;
                      }
                      case ImagePlugin.key: {
                        await insertMedia(editor, { type: ImagePlugin.key });

                        break;
                      }
                      case MediaEmbedPlugin.key: {
                        await insertMedia(editor, {
                          type: MediaEmbedPlugin.key,
                        });

                        break;
                      }
                      case 'ul':
                      case 'ol': {
                        insertEmptyElement(editor, ParagraphPlugin.key, {
                          nextBlock: true,
                          select: true,
                        });

                        if (settingsStore.get.checkedId(IndentListPlugin.key)) {
                          toggleIndentList(editor, {
                            listStyleType: type === 'ul' ? 'disc' : 'decimal',
                          });
                        } else if (settingsStore.get.checkedId('list')) {
                          editor.tf.toggle.list({ type });
                        }

                        break;
                      }
                      case TablePlugin.key: {
                        insertTable(editor);

                        break;
                      }
                      case LinkPlugin.key: {
                        triggerFloatingLink(editor, { focused: true });

                        break;
                      }
                      default: {
                        insertEmptyElement(editor, type, {
                          nextBlock: true,
                          select: true,
                        });
                      }
                    }

                    focusEditor(editor);
                  }}
                >
                  <Icon className="mr-2 size-5" />
                  {itemLabel}
                </DropdownMenuItem>
              )
            )}
          </React.Fragment>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
