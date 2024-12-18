import React from 'react';

import {
  getAboveNode,
  getEndPoint,
  getStartPoint,
  someNode,
} from '@sewell_stephens/late-common';
import {
  useEditorPlugin,
  useEditorReadOnly,
  useEditorVersion,
  useHotkeys,
} from '@sewell_stephens/late-common/react';
import {
  getDefaultBoundingClientRect,
  getRangeBoundingClientRect,
} from '@sewell_stephens/late-floating';

import type { LinkFloatingToolbarState } from './useFloatingLinkInsert';

import { unwrapLink } from '../../../lib';
import { LinkPlugin } from '../../LinkPlugin';
import { triggerFloatingLinkEdit } from '../../utils/triggerFloatingLinkEdit';
import { useFloatingLinkEnter } from './useFloatingLinkEnter';
import { useFloatingLinkEscape } from './useFloatingLinkEscape';
import { useVirtualFloatingLink } from './useVirtualFloatingLink';

export const useFloatingLinkEditState = ({
  floatingOptions,
}: LinkFloatingToolbarState = {}) => {
  const { editor, getOptions, type, useOption } = useEditorPlugin(LinkPlugin);

  const { triggerFloatingLinkHotkeys } = getOptions();
  const readOnly = useEditorReadOnly();
  const isEditing = useOption('isEditing');
  const version = useEditorVersion();
  const mode = useOption('mode');
  const open = useOption('isOpen', editor.id);

  const getBoundingClientRect = React.useCallback(() => {
    const entry = getAboveNode(editor, {
      match: { type },
    });

    if (entry) {
      const [, path] = entry;

      return getRangeBoundingClientRect(editor, {
        anchor: getStartPoint(editor, path),
        focus: getEndPoint(editor, path),
      });
    }

    return getDefaultBoundingClientRect();
  }, [editor, type]);

  const isOpen = open && mode === 'edit';

  const floating = useVirtualFloatingLink({
    editorId: editor.id,
    getBoundingClientRect,
    open: isOpen,
    ...floatingOptions,
  });

  return {
    editor,
    floating,
    isEditing,
    isOpen,
    readOnly,
    triggerFloatingLinkHotkeys,
    versionEditor: version,
  };
};

export const useFloatingLinkEdit = ({
  editor,
  floating,
  triggerFloatingLinkHotkeys,
  versionEditor,
}: ReturnType<typeof useFloatingLinkEditState>) => {
  const { api, getOptions } = useEditorPlugin(LinkPlugin);

  React.useEffect(() => {
    if (
      editor.selection &&
      someNode(editor, {
        match: { type: editor.getType(LinkPlugin) },
      })
    ) {
      api.floatingLink.show('edit', editor.id);
      floating.update();

      return;
    }
    if (getOptions().mode === 'edit') {
      api.floatingLink.hide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editor, versionEditor, floating.update]);

  useHotkeys(
    triggerFloatingLinkHotkeys!,
    (e) => {
      if (getOptions().mode === 'edit' && triggerFloatingLinkEdit(editor)) {
        e.preventDefault();
      }
    },
    {
      enableOnContentEditable: true,
    },
    []
  );

  useFloatingLinkEnter();

  useFloatingLinkEscape();

  return {
    editButtonProps: {
      onClick: () => {
        triggerFloatingLinkEdit(editor);
      },
    },
    props: {
      style: {
        ...floating.style,
        zIndex: 50,
      },
    },
    ref: floating.refs.setFloating,
    unlinkButtonProps: {
      onClick: () => {
        unwrapLink(editor);
      },
      onMouseDown: (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
      },
    },
  };
};
