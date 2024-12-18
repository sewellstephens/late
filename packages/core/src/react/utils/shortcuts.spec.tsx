/** @jsx jsx */

import { BoldPlugin } from '@sewellstephens/plate-basic-marks/react';
import { jsx } from '@sewellstephens/plate-test-utils';

import { createLateTestEditor } from '../__tests__/createLateTestEditor';

jsx;
import { type LateEditor, createLateEditor } from '../editor';
import { createLatePlugin } from '../plugin';

it('should use custom hotkey for bold', async () => {
  const input = (
    <editor>
      <hp>
        Hello <anchor />
        world
        <focus />
      </hp>
    </editor>
  ) as any as LateEditor;

  const output = (
    <editor>
      <hp>
        Hello <htext bold>world</htext>
      </hp>
    </editor>
  ) as any as LateEditor;

  const [editor, { triggerKeyboardEvent }] = await createLateTestEditor({
    editor: input,
    plugins: [
      BoldPlugin.configure({
        handlers: {
          onKeyDown: ({ editor, event }) => {
            if (event.key === 'b' && event.ctrlKey) {
              editor.tf.toggle.mark({ key: 'bold' });
            }
          },
        },
      }),
    ],
  });

  await triggerKeyboardEvent('mod+b');

  expect(editor.children).toEqual(output.children);
});

describe('extend method with shortcuts', () => {
  it('should add new shortcuts to a plugin', () => {
    const testPlugin = createLatePlugin({
      key: 'testPlugin',
      shortcuts: {
        bold: {
          handler: () => {},
          keys: 'mod+b',
        },
      },
    }).extend({
      shortcuts: {
        italic: {
          handler: () => {},
          keys: 'mod+i',
        },
      },
    });

    const editor = createLateEditor({
      plugins: [testPlugin],
    });

    expect(editor.shortcuts.bold).toBeDefined();
    expect(editor.shortcuts.italic).toBeDefined();
  });

  it('should override existing shortcuts in a plugin', () => {
    const originalCallback = jest.fn();
    const newCallback = jest.fn();

    const testPlugin = createLatePlugin({
      key: 'testPlugin',
      shortcuts: {
        bold: {
          handler: originalCallback,
          keys: 'mod+b',
        },
      },
    }).extend({
      shortcuts: {
        bold: {
          handler: newCallback,
          keys: 'mod+b',
        },
      },
    });

    const editor = createLateEditor({
      plugins: [testPlugin],
    });

    editor.shortcuts.bold?.handler?.({
      editor,
      event: {} as KeyboardEvent,
      handler: {} as any,
    } as any);

    expect(originalCallback).not.toHaveBeenCalled();
    expect(newCallback).toHaveBeenCalled();
  });

  it('should configure existing shortcuts in a plugin', () => {
    const originalCallback = jest.fn();
    const newCallback = jest.fn();

    const testPlugin = createLatePlugin({
      key: 'testPlugin',
      shortcuts: {
        bold: {
          handler: originalCallback,
          keys: 'mod+b',
        },
      },
    }).configure({
      shortcuts: {
        bold: {
          keys: 'mod+bb',
        },
      },
    });

    const editor = createLateEditor({
      plugins: [testPlugin],
    });

    expect(editor.shortcuts.bold?.keys).toBe('mod+bb');
  });

  it('should allow removing shortcuts by setting them to null', () => {
    const testPlugin = createLatePlugin({
      key: 'testPlugin',
      shortcuts: {
        bold: {
          handler: () => {},
          keys: 'mod+b',
        },
        italic: {
          handler: () => {},
          keys: 'mod+i',
        },
      },
    }).extend({
      shortcuts: {
        bold: null,
      },
    });

    const editor = createLateEditor({
      plugins: [testPlugin],
    });

    expect(editor.shortcuts.bold).toBeUndefined();
    expect(editor.shortcuts.italic).toBeDefined();
  });

  it('should allow extending shortcuts using a function', () => {
    const testPlugin = createLatePlugin({
      key: 'testPlugin',
      shortcuts: {
        bold: {
          handler: () => {},
          keys: 'mod+b',
        },
      },
    }).extend((ctx) => ({
      shortcuts: {
        bold: null,
        italic: {
          handler: () => {},
          keys: ctx.plugin.shortcuts.bold?.keys ?? [],
        },
      },
    }));

    const editor = createLateEditor({
      plugins: [testPlugin],
    });

    expect(editor.shortcuts.bold).toBeUndefined();
    expect(editor.shortcuts.italic?.keys).toBe('mod+b');
  });

  it('should respect hotkey priority when resolving conflicting shortcuts', () => {
    const lowPriorityHotkeyPlugin = createLatePlugin({
      key: 'lowPriorityHotkey',
      shortcuts: {
        bold: {
          handler: () => {},
          keys: 'mod+b',
          priority: 50,
        },
        italic: {
          handler: () => {},
          keys: 'mod+i',
          priority: 50,
        },
      },
    });

    const highPriorityHotkeyPlugin = createLatePlugin({
      key: 'highPriorityHotkey',
      shortcuts: {
        bold: {
          handler: () => {},
          keys: 'mod+shift+b',
          priority: 150,
        },
      },
    });

    const defaultPriorityHotkeyPlugin = createLatePlugin({
      key: 'defaultPriorityHotkey',
      shortcuts: {
        bold: {
          handler: () => {},
          keys: 'mod+alt+b',
          // No priority specified, should default to 100
        },
        italic: {
          handler: () => {},
          keys: 'mod+alt+i',
          // No priority specified, should default to 100
        },
      },
    });

    const editor = createLateEditor({
      plugins: [
        defaultPriorityHotkeyPlugin,
        highPriorityHotkeyPlugin,
        lowPriorityHotkeyPlugin,
      ],
    });

    expect(editor.shortcuts.bold?.keys).toBe('mod+shift+b');
    expect(editor.shortcuts.italic?.keys).toBe('mod+alt+i');
  });

  it('should use the last defined hotkey when priorities are equal', () => {
    const firstPlugin = createLatePlugin({
      key: 'firstPlugin',
      shortcuts: {
        bold: {
          handler: () => {},
          keys: 'mod+b',
          priority: 100,
        },
      },
    });

    const secondPlugin = createLatePlugin({
      key: 'secondPlugin',
      shortcuts: {
        bold: {
          handler: () => {},
          keys: 'mod+shift+b',
          priority: 100,
        },
      },
    });

    const editor = createLateEditor({
      plugins: [firstPlugin, secondPlugin],
    });

    expect(editor.shortcuts.bold?.keys).toBe('mod+shift+b');
  });

  it('should prioritize root plugin shortcuts over other plugins', () => {
    const lowPriorityPlugin = createLatePlugin({
      key: 'lowPriority',
      shortcuts: {
        bold: {
          handler: () => {},
          keys: 'mod+b',
        },
      },
    });

    const editor = createLateEditor({
      plugins: [lowPriorityPlugin],
      shortcuts: {
        bold: {
          handler: () => {},
          keys: 'mod+alt+b',
        },
      },
    });

    expect(editor.shortcuts.bold?.keys).toBe('mod+alt+b');
  });
});

describe('shortcut priority and plugin interaction', () => {
  it('should prioritize shortcut-specific priority over plugin priority', () => {
    const lowPriorityPlugin = createLatePlugin({
      key: 'lowPriority',
      priority: 50,
      shortcuts: {
        bold: {
          handler: () => {},
          keys: 'mod+b',
          priority: 200, // High priority shortcut in a low priority plugin
        },
      },
    });

    const highPriorityPlugin = createLatePlugin({
      key: 'highPriority',
      priority: 150,
      shortcuts: {
        bold: {
          handler: () => {},
          keys: 'mod+shift+b',
          // No specific priority, should use plugin priority
        },
      },
    });

    const editor = createLateEditor({
      plugins: [lowPriorityPlugin, highPriorityPlugin],
    });

    expect(editor.shortcuts.bold?.keys).toBe('mod+b');
  });

  it('should use plugin priority when shortcut priority is not specified', () => {
    const lowPriorityPlugin = createLatePlugin({
      key: 'lowPriority',
      priority: 50,
      shortcuts: {
        italic: {
          handler: () => {},
          keys: 'mod+i',
          // No specific priority, should use plugin priority
        },
      },
    });

    const highPriorityPlugin = createLatePlugin({
      key: 'highPriority',
      priority: 150,
      shortcuts: {
        italic: {
          handler: () => {},
          keys: 'mod+shift+i',
          // No specific priority, should use plugin priority
        },
      },
    });

    const editor = createLateEditor({
      plugins: [lowPriorityPlugin, highPriorityPlugin],
    });

    expect(editor.shortcuts.italic?.keys).toBe('mod+shift+i');
  });

  it('should handle multiple shortcuts with different priorities', () => {
    const testPlugin = createLatePlugin({
      key: 'testPlugin',
      priority: 100,
      shortcuts: {
        bold: {
          handler: () => {},
          keys: 'mod+b',
          priority: 150,
        },
        italic: {
          handler: () => {},
          keys: 'mod+i',
          // No specific priority, should use plugin priority
        },
        underline: {
          handler: () => {},
          keys: 'mod+u',
          priority: 50,
        },
      },
    });

    const overridePlugin = createLatePlugin({
      key: 'overridePlugin',
      priority: 120,
      shortcuts: {
        bold: {
          handler: () => {},
          keys: 'mod+shift+b',
          // No specific priority, should use plugin priority
        },
        italic: {
          handler: () => {},
          keys: 'mod+shift+i',
          priority: 200,
        },
        underline: {
          handler: () => {},
          keys: 'mod+shift+u',
          // No specific priority, should use plugin priority
        },
      },
    });

    const editor = createLateEditor({
      plugins: [testPlugin, overridePlugin],
    });

    expect(editor.shortcuts.bold?.keys).toBe('mod+b');
    expect(editor.shortcuts.italic?.keys).toBe('mod+shift+i');
    expect(editor.shortcuts.underline?.keys).toBe('mod+shift+u');
  });

  it('should handle root plugin shortcuts with different priorities', () => {
    const testPlugin = createLatePlugin({
      key: 'testPlugin',
      priority: 100,
      shortcuts: {
        bold: {
          handler: () => {},
          keys: 'mod+b',
        },
        italic: {
          handler: () => {},
          keys: 'mod+i',
        },
      },
    });

    const editor = createLateEditor({
      plugins: [testPlugin],
      shortcuts: {
        bold: {
          handler: () => {},
          keys: 'mod+shift+b',
          priority: 50, // Lower than testPlugin
        },
        italic: {
          handler: () => {},
          keys: 'mod+shift+i',
          priority: 200, // Higher than testPlugin
        },
        underline: {
          handler: () => {},
          keys: 'mod+u',
          // No specific priority, should use root plugin priority (highest)
        },
      },
    });

    expect(editor.shortcuts.bold?.keys).toBe('mod+b');
    expect(editor.shortcuts.italic?.keys).toBe('mod+shift+i');
    expect(editor.shortcuts.underline?.keys).toBe('mod+u');
  });
});
