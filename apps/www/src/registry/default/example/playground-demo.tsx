'use client';

import React, { useEffect, useRef, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import type { ValueId } from '@/config/customizer-plugins';
import type { Value } from '@sewellstephens/plate-common';

import { cn } from '@sewellstephens/cn';
import { AlignPlugin } from '@sewellstephens/plate-alignment';
import { AutoformatPlugin } from '@sewellstephens/plate-autoformat/react';
import {
  BoldPlugin,
  CodePlugin,
  ItalicPlugin,
  StrikethroughPlugin,
  SubscriptPlugin,
  SuperscriptPlugin,
  UnderlinePlugin,
} from '@sewellstephens/plate-basic-marks/react';
import { BlockquotePlugin } from '@sewellstephens/plate-block-quote/react';
import { SingleLinePlugin } from '@sewellstephens/plate-break/react';
import { CaptionPlugin } from '@sewellstephens/plate-caption/react';
import { CodeBlockPlugin } from '@sewellstephens/plate-code-block/react';
import { CommentsPlugin } from '@sewellstephens/plate-comments/react';
import {
  ParagraphPlugin,
  Plate,
  usePlateEditor,
} from '@sewellstephens/plate-common/react';
import { DatePlugin } from '@sewellstephens/plate-date';
import { DndPlugin } from '@sewellstephens/plate-dnd';
import { DocxPlugin } from '@sewellstephens/plate-docx';
import { EmojiPlugin } from '@sewellstephens/plate-emoji';
import { ExcalidrawPlugin } from '@sewellstephens/plate-excalidraw/react';
import {
  FontBackgroundColorPlugin,
  FontColorPlugin,
  FontSizePlugin,
} from '@sewellstephens/plate-font';
import { HEADING_KEYS } from '@sewellstephens/plate-heading';
import { HeadingPlugin } from '@sewellstephens/plate-heading/react';
import { HighlightPlugin } from '@sewellstephens/plate-highlight/react';
import { HorizontalRulePlugin } from '@sewellstephens/plate-horizontal-rule/react';
import { IndentPlugin } from '@sewellstephens/plate-indent/react';
import { IndentListPlugin } from '@sewellstephens/plate-indent-list/react';
import { JuicePlugin } from '@sewellstephens/plate-juice';
import { KbdPlugin } from '@sewellstephens/plate-kbd/react';
import { ColumnPlugin } from '@sewellstephens/plate-layout/react';
import { LineHeightPlugin } from '@sewellstephens/plate-line-height';
import { LinkPlugin } from '@sewellstephens/plate-link/react';
import { ListPlugin, TodoListPlugin } from '@sewellstephens/plate-list/react';
import { MarkdownPlugin } from '@sewellstephens/plate-markdown';
import { ImagePlugin, MediaEmbedPlugin } from '@sewellstephens/plate-media/react';
import { MentionPlugin } from '@sewellstephens/plate-mention/react';
import { NodeIdPlugin } from '@sewellstephens/plate-node-id';
import { NormalizeTypesPlugin } from '@sewellstephens/plate-normalizers';
import { PlaywrightPlugin } from '@sewellstephens/plate-playwright';
import { DeletePlugin, SelectOnBackspacePlugin } from '@sewellstephens/plate-select';
import { BlockSelectionPlugin } from '@sewellstephens/plate-selection/react';
import { SlashPlugin } from '@sewellstephens/plate-slash-command';
import { TablePlugin } from '@sewellstephens/plate-table/react';
import { TogglePlugin } from '@sewellstephens/plate-toggle/react';
import { TrailingBlockPlugin } from '@sewellstephens/plate-trailing-block';
import Prism from 'prismjs';

import { settingsStore } from '@/components/context/settings-store';
import { PlaygroundFixedToolbarButtons } from '@/components/plate-ui/playground-fixed-toolbar-buttons';
import { PlaygroundFloatingToolbarButtons } from '@/components/plate-ui/playground-floating-toolbar-buttons';
import { getAutoformatOptions } from '@/lib/plate/demo/plugins/autoformatOptions';
import { createPlateUI } from '@/plate/create-plate-ui';
import { editableProps } from '@/plate/demo/editableProps';
import { isEnabled } from '@/plate/demo/is-enabled';
import { DragOverCursorPlugin } from '@/plate/demo/plugins/DragOverCursorPlugin';
import { exitBreakPlugin } from '@/plate/demo/plugins/exitBreakPlugin';
import { resetBlockTypePlugin } from '@/plate/demo/plugins/resetBlockTypePlugin';
import { softBreakPlugin } from '@/plate/demo/plugins/softBreakPlugin';
import { tabbablePlugin } from '@/plate/demo/plugins/tabbablePlugin';
import { commentsData, usersData } from '@/plate/demo/values/commentsValue';
import { usePlaygroundValue } from '@/plate/demo/values/usePlaygroundValue';
import { CommentsPopover } from '@/registry/default/plate-ui/comments-popover';
import { CursorOverlay } from '@/registry/default/plate-ui/cursor-overlay';
import { Editor } from '@/registry/default/plate-ui/editor';
import { FixedToolbar } from '@/registry/default/plate-ui/fixed-toolbar';
import { FloatingToolbar } from '@/registry/default/plate-ui/floating-toolbar';
import { ImagePreview } from '@/registry/default/plate-ui/image-preview';
import {
  FireLiComponent,
  FireMarker,
} from '@/registry/default/plate-ui/indent-fire-marker-component';
import {
  TodoLi,
  TodoMarker,
} from '@/registry/default/plate-ui/indent-todo-marker-component';
import { LinkFloatingToolbar } from '@/registry/default/plate-ui/link-floating-toolbar';

import { usePlaygroundEnabled } from './usePlaygroundEnabled';

export const usePlaygroundEditor = (id: any = '', scrollSelector?: string) => {
  const enabled = settingsStore.use.checkedComponents();
  const overridePlugins = usePlaygroundEnabled(id);
  const autoformatOptions = getAutoformatOptions(id, enabled);

  const value = usePlaygroundValue(id);
  const key = useInitialValueVersion(value);

  const editorId = id || 'playground-' + key;

  return usePlateEditor(
    {
      id: editorId,
      override: {
        components: createPlateUI({
          draggable: isEnabled('dnd', id),
          placeholder: isEnabled('placeholder', id),
        }),
        plugins: overridePlugins,
      },
      plugins: [
        // Nodes
        HeadingPlugin,
        BlockquotePlugin,
        CodeBlockPlugin.configure({
          options: {
            prism: Prism,
          },
        }),
        HorizontalRulePlugin,
        LinkPlugin.extend({
          render: { afterEditable: () => <LinkFloatingToolbar /> },
        }),
        ListPlugin,
        ImagePlugin.extend({
          render: { afterEditable: ImagePreview },
        }),
        MediaEmbedPlugin,
        CaptionPlugin.configure({
          options: {
            plugins: [ImagePlugin, MediaEmbedPlugin],
          },
        }),
        DatePlugin,
        MentionPlugin.configure({
          options: {
            triggerPreviousCharPattern: /^$|^[\s"']$/,
          },
        }),
        SlashPlugin,
        TablePlugin.configure({
          options: {
            enableMerging: id === 'tableMerge',
          },
        }),
        TodoListPlugin,
        TogglePlugin,
        ExcalidrawPlugin,

        // Marks
        BoldPlugin,
        ItalicPlugin,
        UnderlinePlugin,
        StrikethroughPlugin,
        CodePlugin,
        SubscriptPlugin,
        SuperscriptPlugin,
        FontColorPlugin,
        FontBackgroundColorPlugin,
        FontSizePlugin,
        HighlightPlugin,
        KbdPlugin,

        // Block Style
        AlignPlugin.extend({
          inject: {
            targetPlugins: [
              ParagraphPlugin.key,
              MediaEmbedPlugin.key,
              HEADING_KEYS.h1,
              HEADING_KEYS.h2,
              HEADING_KEYS.h3,
              HEADING_KEYS.h4,
              HEADING_KEYS.h5,
              ImagePlugin.key,
              HEADING_KEYS.h6,
            ],
          },
        }),
        IndentPlugin.extend({
          inject: {
            targetPlugins: [
              ParagraphPlugin.key,
              HEADING_KEYS.h1,
              HEADING_KEYS.h2,
              HEADING_KEYS.h3,
              HEADING_KEYS.h4,
              HEADING_KEYS.h5,
              HEADING_KEYS.h6,
              BlockquotePlugin.key,
              CodeBlockPlugin.key,
              TogglePlugin.key,
            ],
          },
        }),
        IndentListPlugin.extend({
          inject: {
            targetPlugins: [
              ParagraphPlugin.key,
              HEADING_KEYS.h1,
              HEADING_KEYS.h2,
              HEADING_KEYS.h3,
              HEADING_KEYS.h4,
              HEADING_KEYS.h5,
              HEADING_KEYS.h6,
              BlockquotePlugin.key,
              CodeBlockPlugin.key,
              TogglePlugin.key,
            ],
          },
          options: {
            listStyleTypes: {
              fire: {
                liComponent: FireLiComponent,
                markerComponent: FireMarker,
                type: 'fire',
              },
              todo: {
                liComponent: TodoLi,
                markerComponent: TodoMarker,
                type: 'todo',
              },
            },
          },
        }),
        LineHeightPlugin.extend({
          inject: {
            nodeProps: {
              defaultNodeValue: 1.5,
              validNodeValues: [1, 1.2, 1.5, 2, 3],
            },
            targetPlugins: [
              ParagraphPlugin.key,
              HEADING_KEYS.h1,
              HEADING_KEYS.h2,
              HEADING_KEYS.h3,
              HEADING_KEYS.h4,
              HEADING_KEYS.h5,
              HEADING_KEYS.h6,
            ],
          },
        }),

        // Functionality
        AutoformatPlugin.configure({ options: autoformatOptions }),
        BlockSelectionPlugin.configure({
          options: {
            areaOptions: {
              boundaries: `#${scrollSelector}`,
              container: `#${scrollSelector}`,
              selectables: [`#${scrollSelector} .slate-selectable`],
              selectionAreaClass: 'slate-selection-area',
            },
            enableContextMenu: false,
          },
        }),
        DndPlugin.configure({ options: { enableScroller: true } }),
        EmojiPlugin,
        exitBreakPlugin,
        NodeIdPlugin,
        NormalizeTypesPlugin.configure({
          options: {
            rules: [{ path: [0], strictType: HEADING_KEYS.h1 }],
          },
        }),
        resetBlockTypePlugin,
        SelectOnBackspacePlugin.configure({
          options: {
            query: {
              allow: [ImagePlugin.key, HorizontalRulePlugin.key],
            },
          },
        }),
        DeletePlugin,
        SingleLinePlugin,
        softBreakPlugin,
        tabbablePlugin,
        TrailingBlockPlugin.configure({
          options: { type: ParagraphPlugin.key },
        }),
        DragOverCursorPlugin,

        // Collaboration
        CommentsPlugin.configure({
          options: {
            comments: commentsData,
            myUserId: '1',
            users: usersData,
          },
        }),

        // Deserialization
        DocxPlugin,
        MarkdownPlugin,
        JuicePlugin,
        ColumnPlugin,

        // Testing
        PlaywrightPlugin.configure({
          enabled: process.env.NODE_ENV !== 'production',
        }),
      ],
      shouldNormalizeEditor: true,
      value: value,
    },
    []
  );
};

export default function PlaygroundDemo({
  id,
  scrollSelector,
}: {
  id?: ValueId;
  scrollSelector?: string;
}) {
  const containerRef = useRef(null);
  const enabled = settingsStore.use.checkedComponents();

  const editor = usePlaygroundEditor(id, scrollSelector);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="relative">
        <Plate editor={editor}>
          {enabled['fixed-toolbar'] && (
            <FixedToolbar className="no-scrollbar">
              {enabled['fixed-toolbar-buttons'] && (
                <PlaygroundFixedToolbarButtons id={id} />
              )}
            </FixedToolbar>
          )}

          <div
            className="flex w-full"
            id="editor-playground"
            style={
              {
                '--editor-px': 'max(5%,24px)',
              } as any
            }
          >
            <div
              className={cn(
                'relative flex max-h-[800px] w-full overflow-x-auto',
                // block selection area
                '[&_.slate-selected]:!bg-primary/20 [&_.slate-selection-area]:border [&_.slate-selection-area]:border-primary [&_.slate-selection-area]:bg-primary/10'
              )}
              data-plate-selectable
              id={scrollSelector}
              ref={containerRef}
            >
              <Editor
                {...editableProps}
                className={cn(
                  editableProps.className,
                  ' overflow-x-hidden px-[var(--editor-px)]',
                  !id && 'pb-[20vh] pt-4',
                  id && 'pb-8 pt-2'
                )}
                focusRing={false}
                placeholder=""
                size="md"
                variant="ghost"
              />

              {enabled['floating-toolbar'] && (
                <FloatingToolbar>
                  {enabled['floating-toolbar-buttons'] && (
                    <PlaygroundFloatingToolbarButtons id={id} />
                  )}
                </FloatingToolbar>
              )}

              {isEnabled('cursoroverlay', id) && (
                <CursorOverlay containerRef={containerRef} />
              )}
            </div>

            {isEnabled('comment', id, enabled['comments-popover']) && (
              <CommentsPopover />
            )}
          </div>
        </Plate>
      </div>
    </DndProvider>
  );
}

// reset editor when initialValue changes
export const useInitialValueVersion = (initialValue: Value) => {
  const enabled = settingsStore.use.checkedPlugins();
  const [version, setVersion] = useState(1);
  const prevEnabled = useRef(enabled);
  const prevInitialValueRef = useRef(initialValue);

  useEffect(() => {
    if (enabled === prevEnabled.current) return;

    prevEnabled.current = enabled;
    setVersion((v) => v + 1);
  }, [enabled]);

  useEffect(() => {
    if (initialValue === prevInitialValueRef.current) return;

    prevInitialValueRef.current = initialValue;
    setVersion((v) => v + 1);
  }, [initialValue]);

  return version;
};
