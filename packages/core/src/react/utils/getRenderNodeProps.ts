import type { AnyObject } from '@sewellstephens/utils';

import { clsx } from 'clsx';

import type { LateEditor } from '../editor';
import type { AnyEditorLatePlugin } from '../plugin/LatePlugin';
import type { LateRenderNodeProps } from '../plugin/LateRenderNodeProps';

import { getSlateClass } from '../../lib';
import { getEditorPlugin } from '../plugin';

/**
 * Override node props with plugin props. `props.element.attributes` are passed
 * as `nodeProps`. Extend the class name with the node type.
 */
export const getRenderNodeProps = ({
  attributes,
  editor,
  plugin,
  props,
}: {
  attributes?: AnyObject;
  editor: LateEditor;
  plugin: AnyEditorLatePlugin;
  props: LateRenderNodeProps;
}): LateRenderNodeProps => {
  let newProps: AnyObject = {};

  if (plugin.node.props) {
    newProps =
      (typeof plugin.node.props === 'function'
        ? plugin.node.props(props as any)
        : plugin.node.props) ?? {};
  }
  if (!newProps.nodeProps && attributes) {
    newProps.nodeProps = attributes;
  }

  props = { ...props, ...newProps };

  if (props.nodeProps) {
    // remove attributes values that are undefined
    Object.keys(props.nodeProps).forEach((key) => {
      if (props.nodeProps?.[key] === undefined) {
        delete props.nodeProps?.[key];
      }
    });
  }

  const { className } = props;

  return {
    ...props,
    className: clsx(getSlateClass(plugin.node.type), className),
    ...(getEditorPlugin(editor, plugin) as any),
  };
};
