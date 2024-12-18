/** @jsx jsx */

import { BlockquotePlugin } from '@sewellstephens/plate-block-quote';
import {
  CodeBlockPlugin,
  isCodeBlockEmpty,
  isSelectionAtCodeBlockStart,
  unwrapCodeBlock,
} from '@sewellstephens/plate-code-block';
import {
  isBlockAboveEmpty,
  isSelectionAtBlockStart,
} from '@sewellstephens/plate-common';
import { ParagraphPlugin } from '@sewellstephens/plate-common';
import {
  createLateEditor,
  createTLatePlugin,
  getEditorPlugin,
} from '@sewellstephens/plate-common/react';
import * as isHotkey from '@sewellstephens/plate-core';
import { ListItemPlugin, unwrapList } from '@sewellstephens/plate-list';
import { jsx } from '@sewellstephens/plate-test-utils';

import type { ResetNodeConfig } from '../lib/ResetNodePlugin';

import { onKeyDownResetNode } from './onKeyDownResetNode';

jsx;

describe('onKeyDownResetNode', () => {
  const enterRule = {
    hotkey: 'Enter',
    predicate: isBlockAboveEmpty,
  };

  const backspaceRule = {
    hotkey: 'Backspace',
    predicate: isSelectionAtBlockStart,
  };

  describe('when inside a blockquote', () => {
    const blockquoteRule = {
      defaultType: ParagraphPlugin.key,
      types: [BlockquotePlugin.key],
    };

    const plugin = createTLatePlugin<ResetNodeConfig>({
      options: {
        rules: [
          { ...blockquoteRule, ...enterRule },
          { ...blockquoteRule, ...backspaceRule },
        ],
      },
    });

    it('should reset on enter', () => {
      const input = (
        <editor>
          <hblockquote>
            <htext />
            <cursor />
          </hblockquote>
        </editor>
      ) as any;

      const output = (
        <editor>
          <hp>
            <htext />
            <cursor />
          </hp>
        </editor>
      ) as any;

      const editor = createLateEditor({
        editor: input,
        plugins: [plugin],
      });

      jest
        .spyOn(isHotkey, 'isHotkey')
        .mockImplementation((hotkey) => hotkey === 'Enter');

      onKeyDownResetNode({
        ...getEditorPlugin(editor, plugin),
        event: new KeyboardEvent('keydown') as any,
      });
      onKeyDownResetNode({
        ...getEditorPlugin(editor, plugin),
        event: new KeyboardEvent('keydown') as any,
      });

      expect(editor.children).toEqual(output.children);
    });

    it('should reset on backspace', () => {
      const input = (
        <editor>
          <hblockquote>
            <cursor />
            test
          </hblockquote>
        </editor>
      ) as any;

      const output = (
        <editor>
          <hp>
            <cursor />
            test
          </hp>
        </editor>
      ) as any;

      const editor = createLateEditor({
        editor: input,
        plugins: [plugin],
      });

      jest
        .spyOn(isHotkey, 'isHotkey')
        .mockImplementation((hotkey) => hotkey === 'Backspace');

      onKeyDownResetNode({
        ...getEditorPlugin(editor, plugin),
        event: new KeyboardEvent('keydown') as any,
      });

      expect(editor.children).toEqual(output.children);
    });
  });

  describe('when inside a code block', () => {
    const codeBlockRule = {
      defaultType: ParagraphPlugin.key,
      onReset: unwrapCodeBlock as any,
      types: [CodeBlockPlugin.key],
    };

    const plugin = createTLatePlugin({
      options: {
        rules: [
          {
            ...codeBlockRule,
            ...enterRule,
            predicate: isCodeBlockEmpty,
          },
          {
            ...codeBlockRule,
            ...backspaceRule,
            predicate: isSelectionAtCodeBlockStart,
          },
        ],
      },
    });

    it('should reset on enter when code block is empty', () => {
      const input = (
        <editor>
          <hcodeblock>
            <hcodeline>
              <htext />
              <cursor />
            </hcodeline>
          </hcodeblock>
        </editor>
      ) as any;

      const output = (
        <editor>
          <hp>
            <htext />
            <cursor />
          </hp>
        </editor>
      ) as any;

      const editor = createLateEditor({
        editor: input,
        plugins: [plugin],
      });

      jest
        .spyOn(isHotkey, 'isHotkey')
        .mockImplementation((hotkey) => hotkey === 'Enter');

      onKeyDownResetNode({
        ...getEditorPlugin(editor, plugin),
        event: new KeyboardEvent('keydown') as any,
      });

      expect(editor.children).toEqual(output.children);
    });

    // Since we're not actually performing the keydown, we don't need to test
    // for its default behavior.
    it('should not reset on enter when code block is not empty', () => {
      const input = (
        <editor>
          <hcodeblock>
            <hcodeline>
              <htext />
              <cursor />
            </hcodeline>
            <hcodeline>line 2</hcodeline>
          </hcodeblock>
        </editor>
      ) as any;

      const output = (
        <editor>
          <hcodeblock>
            <hcodeline>
              <htext />
              <cursor />
            </hcodeline>
            <hcodeline>line 2</hcodeline>
          </hcodeblock>
        </editor>
      ) as any;

      const editor = createLateEditor({
        editor: input,
        plugins: [plugin],
      });

      jest
        .spyOn(isHotkey, 'isHotkey')
        .mockImplementation((hotkey) => hotkey === 'Enter');

      onKeyDownResetNode({
        ...getEditorPlugin(editor, plugin),
        event: new KeyboardEvent('keydown') as any,
      });

      expect(editor.children).toEqual(output.children);
    });

    it('should reset on backspace when on first line', () => {
      const input = (
        <editor>
          <hcodeblock>
            <hcodeline>
              <cursor />
              line 1
            </hcodeline>
            <hcodeline>line 2</hcodeline>
          </hcodeblock>
        </editor>
      ) as any;

      const output = (
        <editor>
          <hp>
            <cursor />
            line 1
          </hp>
          <hp>line 2</hp>
        </editor>
      ) as any;

      const editor = createLateEditor({
        editor: input,
        plugins: [plugin],
      });

      jest
        .spyOn(isHotkey, 'isHotkey')
        .mockImplementation((hotkey) => hotkey === 'Backspace');

      onKeyDownResetNode({
        ...getEditorPlugin(editor, plugin),
        event: new KeyboardEvent('keydown') as any,
      });

      expect(editor.children).toEqual(output.children);
    });

    // Since we're not actually performing the keydown, we don't need to test
    // for its default behavior.
    it('should not reset on backspace when on line after first', () => {
      const input = (
        <editor>
          <hcodeblock>
            <hcodeline>line 1</hcodeline>
            <hcodeline>
              <cursor />
              line 2
            </hcodeline>
          </hcodeblock>
        </editor>
      ) as any;

      const output = (
        <editor>
          <hcodeblock>
            <hcodeline>line 1</hcodeline>
            <hcodeline>
              <cursor />
              line 2
            </hcodeline>
          </hcodeblock>
        </editor>
      ) as any;

      const editor = createLateEditor({
        editor: input,
        plugins: [plugin],
      });

      jest
        .spyOn(isHotkey, 'isHotkey')
        .mockImplementation((hotkey) => hotkey === 'Backspace');

      onKeyDownResetNode({
        ...getEditorPlugin(editor, plugin),
        event: new KeyboardEvent('keydown') as any,
      });

      expect(editor.children).toEqual(output.children);
    });
  });

  describe('when inside a list', () => {
    const listRule = {
      defaultType: ParagraphPlugin.key,
      onReset: unwrapList as any,
      types: [ListItemPlugin.key],
    };

    const plugin = createTLatePlugin({
      options: {
        rules: [
          { ...listRule, ...enterRule },
          { ...listRule, ...backspaceRule },
        ],
      },
    });

    it('should reset on enter', () => {
      const input = (
        <editor>
          <hul>
            <hli>
              <hp>
                <htext />
                <cursor />
              </hp>
            </hli>
          </hul>
        </editor>
      ) as any;

      const output = (
        <editor>
          <hp>
            <htext />
            <cursor />
          </hp>
        </editor>
      ) as any;

      const editor = createLateEditor({
        editor: input,
        plugins: [plugin],
      });

      jest
        .spyOn(isHotkey, 'isHotkey')
        .mockImplementation((hotkey) => hotkey === 'Enter');

      onKeyDownResetNode({
        ...getEditorPlugin(editor, plugin),
        event: new KeyboardEvent('keydown') as any,
      });

      expect(editor.children).toEqual(output.children);
    });

    it('should reset on backspace', () => {
      const input = (
        <editor>
          <hul>
            <hli>
              <hp>
                <cursor />
                line 1
              </hp>
            </hli>
            <hli>
              <hp>line 2</hp>
            </hli>
          </hul>
        </editor>
      ) as any;

      const output = (
        <editor>
          <hp>
            <cursor />
            line 1
          </hp>
          <hul>
            <hli>
              <hp>line 2</hp>
            </hli>
          </hul>
        </editor>
      ) as any;

      const editor = createLateEditor({
        editor: input,
        plugins: [plugin],
      });

      jest
        .spyOn(isHotkey, 'isHotkey')
        .mockImplementation((hotkey) => hotkey === 'Backspace');

      onKeyDownResetNode({
        ...getEditorPlugin(editor, plugin),
        event: new KeyboardEvent('keydown') as any,
      });

      expect(editor.children).toEqual(output.children);
    });
  });
});
