import React from 'react';

import type { ValueId } from '@/config/customizer-plugins';

import {
  BoldPlugin,
  CodePlugin,
  ItalicPlugin,
  StrikethroughPlugin,
  UnderlinePlugin,
} from '@sewellstephens/plate-basic-marks/react';
import { useEditorReadOnly } from '@sewellstephens/plate-common/react';

import { Icons } from '@/components/icons';
import { isEnabled } from '@/plate/demo/is-enabled';
import { CommentToolbarButton } from '@/registry/default/plate-ui/comment-toolbar-button';
import { LinkToolbarButton } from '@/registry/default/plate-ui/link-toolbar-button';
import { MarkToolbarButton } from '@/registry/default/plate-ui/mark-toolbar-button';
import { ToolbarSeparator } from '@/registry/default/plate-ui/toolbar';

import { PlaygroundMoreDropdownMenu } from './playground-more-dropdown-menu';
import { PlaygroundTurnIntoDropdownMenu } from './playground-turn-into-dropdown-menu';

export function PlaygroundFloatingToolbarButtons({ id }: { id?: ValueId }) {
  const readOnly = useEditorReadOnly();

  return (
    <>
      {!readOnly && (
        <>
          <PlaygroundTurnIntoDropdownMenu />

          <MarkToolbarButton nodeType={BoldPlugin.key} tooltip="Bold (⌘+B)">
            <Icons.bold />
          </MarkToolbarButton>
          <MarkToolbarButton nodeType={ItalicPlugin.key} tooltip="Italic (⌘+I)">
            <Icons.italic />
          </MarkToolbarButton>
          <MarkToolbarButton
            nodeType={UnderlinePlugin.key}
            tooltip="Underline (⌘+U)"
          >
            <Icons.underline />
          </MarkToolbarButton>
          <MarkToolbarButton
            nodeType={StrikethroughPlugin.key}
            tooltip="Strikethrough (⌘+⇧+M)"
          >
            <Icons.strikethrough />
          </MarkToolbarButton>
          <MarkToolbarButton nodeType={CodePlugin.key} tooltip="Code (⌘+E)">
            <Icons.code />
          </MarkToolbarButton>

          <ToolbarSeparator />

          {isEnabled('link', id) && <LinkToolbarButton />}
        </>
      )}

      {isEnabled('comment', id) && <CommentToolbarButton />}

      <PlaygroundMoreDropdownMenu />
    </>
  );
}
