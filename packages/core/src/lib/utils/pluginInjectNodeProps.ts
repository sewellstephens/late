import { type TElement, type TText, isElement } from '@sewell_stephens/slate';
import { type AnyObject, isDefined } from '@sewell_stephens/utils';
import { clsx } from 'clsx';

import type { SlateEditor } from '../editor';
import type { EditorPlugin, TransformOptions } from '../plugin/SlatePlugin';

import { getEditorPlugin } from '../plugin';
import { getKeyByType } from './getKeysByTypes';

export interface GetInjectNodePropsOptions {
  /** Existing className. */
  className?: string;

  /** Style value or className key. */
  element?: TElement;

  /** Existing style. */
  style?: CSSStyleDeclaration;

  /** Style value or className key. */
  text?: TText;
}

export interface GetInjectNodePropsReturnType extends AnyObject {
  className?: string;
  style?: CSSStyleDeclaration;
}

/**
 * Return if `element`, `text`, `nodeKey` is defined. Return if `node.type` is
 * not in `targetPlugins` (if defined). Return if `value = node[nodeKey]` is not
 * in `validNodeValues` (if defined). If `classNames[value]` is defined,
 * override `className` with it. If `styleKey` is defined, override `style` with
 * `[styleKey]: value`.
 */
export const pluginInjectNodeProps = (
  editor: SlateEditor,
  plugin: EditorPlugin,
  nodeProps: GetInjectNodePropsOptions
): GetInjectNodePropsReturnType | undefined => {
  const {
    inject: { nodeProps: injectNodeProps, targetPlugins },
    key,
  } = plugin;

  const { className, element, style, text } = nodeProps;

  const node = element ?? text;

  if (!node) return;
  if (!injectNodeProps) return;

  const {
    classNames,
    defaultNodeValue,
    nodeKey = key,
    query,
    styleKey = nodeKey as any,
    transformClassName,
    transformNodeValue,
    transformProps,
    transformStyle,
    validNodeValues,
  } = injectNodeProps;

  const queryResult = query?.({
    ...injectNodeProps,
    ...(getEditorPlugin(editor, plugin) as any),
    nodeProps,
  });

  if (
    !queryResult &&
    targetPlugins &&
    isElement(node) &&
    node.type &&
    !targetPlugins.includes(getKeyByType(editor, node.type))
  ) {
    return;
  }

  const nodeValue = node[nodeKey!] as any;

  // early return if there is no reason to inject props
  if (
    !queryResult &&
    (!isDefined(nodeValue) ||
      (validNodeValues && !validNodeValues.includes(nodeValue)) ||
      nodeValue === defaultNodeValue)
  ) {
    return;
  }

  const transformOptions: TransformOptions = {
    ...nodeProps,
    ...(getEditorPlugin(editor, plugin) as any),
    nodeValue,
  };
  const value = transformNodeValue?.(transformOptions) ?? nodeValue;
  transformOptions.value = value;

  let res: GetInjectNodePropsReturnType = {};

  if (element) {
    res.className = clsx(className, `slate-${nodeKey}-${nodeValue}`);
  }
  if (classNames?.[nodeValue] || transformClassName) {
    res.className =
      transformClassName?.(transformOptions) ??
      clsx(className, classNames?.[value]);
  }
  if (styleKey) {
    res.style =
      transformStyle?.(transformOptions) ??
      ({
        ...style,
        [styleKey as string]: value,
      } as any);
  }
  if (transformProps) {
    res = transformProps({ ...transformOptions, props: res }) ?? res;
  }

  return res;
};
