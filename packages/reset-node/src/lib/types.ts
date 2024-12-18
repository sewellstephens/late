import type { SlateEditor } from '@sewell_stephens/late-common';

export interface ResetNodePluginRule {
  /** Additional condition to the rule. */
  predicate: (editor: SlateEditor) => boolean;

  /** Node types where the rule applies. */
  types: string[];

  defaultType?: string;

  hotkey?: string | string[];

  /** Callback called when resetting. */
  onReset?: (editor: SlateEditor) => void;
}

export interface ResetNodePluginOptions {
  disableEditorReset?: boolean;
  disableFirstBlockReset?: boolean;
  rules?: ResetNodePluginRule[];
}
