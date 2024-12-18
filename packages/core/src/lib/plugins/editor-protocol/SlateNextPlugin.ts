import type { TElement, TRange, Value } from '@sewell_stephens/slate';
import type { Path } from 'slate';

import {
  isSelectionAtBlockStart,
  removeSelectionMark,
  toggleMark,
} from '@sewell_stephens/slate-utils';
import { type OmitFirst, bindFirst } from '@sewell_stephens/utils';

import {
  type ExtendEditor,
  type PluginConfig,
  createTSlatePlugin,
} from '../../plugin';
import { resetEditor, toggleBlock } from '../../transforms';
import { ParagraphPlugin } from '../paragraph';

export type SlateNextConfig = PluginConfig<
  'slateNext',
  {},
  {
    create: {
      block: (node?: Partial<TElement>, path?: Path) => TElement;
      value: () => Value;
    };
    reset: () => void;
  },
  {
    toggle: {
      block: OmitFirst<typeof toggleBlock>;
      mark: OmitFirst<typeof toggleMark>;
    };
  }
>;

export const withSlateNext: ExtendEditor<SlateNextConfig> = ({ editor }) => {
  const { apply, deleteBackward, deleteForward, deleteFragment } = editor;

  editor.prevSelection = null;
  editor.currentKeyboardEvent = null;

  const resetMarks = () => {
    if (isSelectionAtBlockStart(editor)) {
      removeSelectionMark(editor);
    }
  };

  editor.deleteBackward = (unit) => {
    deleteBackward(unit);

    resetMarks();
  };

  editor.deleteForward = (unit) => {
    deleteForward(unit);

    resetMarks();
  };

  editor.deleteFragment = (direction) => {
    deleteFragment(direction);

    resetMarks();
  };

  editor.apply = (operation) => {
    if (operation.type === 'set_selection') {
      const { properties } = operation;

      editor.prevSelection = properties as TRange | null;

      apply(operation);

      editor.currentKeyboardEvent = null;

      return;
    }

    apply(operation);
  };

  return editor;
};

/** Opinionated extension of slate default behavior. */
export const SlateNextPlugin = createTSlatePlugin<SlateNextConfig>({
  extendEditor: withSlateNext,
  key: 'slateNext',
})
  .extendEditorApi(({ editor }) => ({
    create: {
      /** Default block factory. */
      block: (node?: Partial<TElement>, _path?: Path): TElement => ({
        children: [{ text: '' }],
        type: editor.getType(ParagraphPlugin),
        ...node,
      }),
    },
  }))
  .extendEditorApi(({ api }) => ({
    create: {
      /** Editor children factory. */
      value: (): Value => [api.create.block()],
    },
  }))
  .extendEditorApi(({ editor }) => ({
    reset: () => {
      resetEditor(editor);
    },
  }))
  .extendEditorTransforms(({ editor }) => ({
    toggle: {
      block: bindFirst(toggleBlock, editor),
      mark: bindFirst(toggleMark, editor),
    },
  }));
