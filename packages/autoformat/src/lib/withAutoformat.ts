import { type ExtendEditor, isCollapsed } from '@sewell_stephens/late-common';

import type { AutoformatConfig } from './AutoformatPlugin';

import { autoformatBlock } from './transforms/autoformatBlock';
import { autoformatMark } from './transforms/autoformatMark';
import { autoformatText } from './transforms/autoformatText';

/**
 * Enables support for autoformatting actions. Once a match rule is validated,
 * it does not check the following rules.
 */
export const withAutoformat: ExtendEditor<AutoformatConfig> = ({
  editor,
  getOptions,
}) => {
  const { insertText } = editor;

  editor.insertText = (text) => {
    if (!isCollapsed(editor.selection)) return insertText(text);

    for (const rule of getOptions().rules!) {
      const { insertTrigger, mode = 'text', query } = rule;

      if (query && !query(editor as any, { ...rule, text })) continue;

      const autoformatter: Record<typeof mode, Function> = {
        block: autoformatBlock,
        mark: autoformatMark,
        text: autoformatText,
      };

      if (
        autoformatter[mode]?.(editor, {
          ...(rule as any),
          text,
        })
      ) {
        return insertTrigger && insertText(text);
      }
    }

    insertText(text);
  };

  return editor;
};
