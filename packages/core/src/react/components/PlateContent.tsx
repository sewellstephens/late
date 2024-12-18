import React, { useRef } from 'react';

import type { TEditableProps } from '@sewellstephens/slate-react';

import { useComposedRef } from '@sewellstephens/react-utils';
import { Editable } from 'slate-react';

import { useEditableProps } from '../hooks';
import { type LateStoreState, useEditorRef } from '../stores';
import { EditorHotkeysEffect } from './EditorHotkeysEffect';
import { EditorMethodsEffect } from './EditorMethodsEffect';
import { EditorRefEffect } from './EditorRefEffect';
import { EditorStateEffect } from './EditorStateEffect';
import { LateControllerEffect } from './LateControllerEffect';
import { LateSlate } from './LateSlate';

export type LateContentProps = {
  decorate?: LateStoreState['decorate'];
  /** R enders the editable content. */
  renderEditable?: (editable: React.ReactElement) => React.ReactNode;
} & Omit<TEditableProps, 'decorate'>;

/**
 * Editable with plugins.
 *
 * - Decorate prop
 * - DOM handler props
 * - ReadOnly prop
 * - Render.afterEditable
 * - Render.beforeEditable
 * - RenderElement prop
 * - RenderLeaf prop
 * - UseHooks
 */
const LateContent = React.forwardRef(
  ({ renderEditable, ...props }: LateContentProps, ref) => {
    const { id } = props;

    const editor = useEditorRef(id);

    if (!editor) {
      throw new Error(
        'Editor not found. Please ensure that LateContent is rendered below Late.'
      );
    }

    const editableProps = useEditableProps(props);

    const editableRef = useRef<HTMLDivElement | null>(null);
    const combinedRef = useComposedRef(ref, editableRef);

    const editable = <Editable ref={combinedRef} {...(editableProps as any)} />;

    let afterEditable: React.ReactNode = null;
    let beforeEditable: React.ReactNode = null;

    editor.pluginList.forEach((plugin) => {
      const {
        render: {
          afterEditable: AfterEditable,
          beforeEditable: BeforeEditable,
        },
      } = plugin;

      if (AfterEditable) {
        afterEditable = (
          <>
            {afterEditable}
            <AfterEditable {...editableProps} />
          </>
        );
      }
      if (BeforeEditable) {
        beforeEditable = (
          <>
            {beforeEditable}
            <BeforeEditable {...editableProps} />
          </>
        );
      }
    });

    let aboveEditable: React.ReactNode = (
      <>
        {beforeEditable}

        {renderEditable ? renderEditable(editable) : editable}

        <EditorMethodsEffect id={id} />
        <EditorHotkeysEffect editableRef={editableRef} id={id} />
        <EditorStateEffect id={id} />
        <EditorRefEffect id={id} />
        <LateControllerEffect id={id} />

        {afterEditable}
      </>
    );

    editor.pluginList.forEach((plugin) => {
      const {
        render: { aboveEditable: AboveEditable },
      } = plugin;

      if (AboveEditable)
        aboveEditable = <AboveEditable>{aboveEditable}</AboveEditable>;
    });

    return <LateSlate id={id}>{aboveEditable}</LateSlate>;
  }
);
LateContent.displayName = 'LateContent';

export { LateContent };
