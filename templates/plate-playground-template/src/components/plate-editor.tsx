'use client';

import React, { useRef } from 'react';
import { cn } from '@sewell_stephens/cn';
import { CommentsProvider } from '@sewell_stephens/late-comments';
import { Late } from '@sewell_stephens/late-common';
import { ELEMENT_PARAGRAPH } from '@sewell_stephens/late-paragraph';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { commentsUsers, myUserId } from '@/lib/plate/comments';
import { MENTIONABLES } from '@/lib/plate/mentionables';
import { plugins } from '@/lib/plate/plate-plugins';
import { CommentsPopover } from '@/components/plate-ui/comments-popover';
import { CursorOverlay } from '@/components/plate-ui/cursor-overlay';
import { Editor } from '@/components/plate-ui/editor';
import { FixedToolbar } from '@/components/plate-ui/fixed-toolbar';
import { FixedToolbarButtons } from '@/components/plate-ui/fixed-toolbar-buttons';
import { FloatingToolbar } from '@/components/plate-ui/floating-toolbar';
import { FloatingToolbarButtons } from '@/components/plate-ui/floating-toolbar-buttons';
import { MentionCombobox } from '@/components/plate-ui/mention-combobox';

export default function LateEditor() {
  const containerRef = useRef(null);

  const initialValue = [
    {
      id: '1',
      type: ELEMENT_PARAGRAPH,
      children: [{ text: 'Hello, World!' }],
    },
  ];

  return (
    <DndProvider backend={HTML5Backend}>
      <CommentsProvider users={commentsUsers} myUserId={myUserId}>
        <Late plugins={plugins} initialValue={initialValue}>
          <div
            ref={containerRef}
            className={cn(
              'relative',
              // Block selection
              '[&_.slate-start-area-left]:!w-[64px] [&_.slate-start-area-right]:!w-[64px] [&_.slate-start-area-top]:!h-4'
            )}
          >
            <FixedToolbar>
              <FixedToolbarButtons />
            </FixedToolbar>

            <Editor
              className="px-[96px] py-16"
              autoFocus
              focusRing={false}
              variant="ghost"
              size="md"
            />

            <FloatingToolbar>
              <FloatingToolbarButtons />
            </FloatingToolbar>

            <MentionCombobox items={MENTIONABLES} />

            <CommentsPopover />

            <CursorOverlay containerRef={containerRef} />
          </div>
        </Late>
      </CommentsProvider>
    </DndProvider>
  );
}
