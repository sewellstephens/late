import type { SlateEditor, TElement } from '@sewell_stephens/late-common';

export interface TriggerComboboxPluginOptions {
  createComboboxInput?: (trigger: string) => TElement;
  trigger?: RegExp | string | string[];
  triggerPreviousCharPattern?: RegExp;
  triggerQuery?: (editor: SlateEditor) => boolean;
}

export type ComboboxInputCursorState = {
  atEnd: boolean;
  atStart: boolean;
};

export type CancelComboboxInputCause =
  | 'arrowLeft'
  | 'arrowRight'
  | 'backspace'
  | 'blur'
  | 'deselect'
  | 'escape'
  | 'manual';
