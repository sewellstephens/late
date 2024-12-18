import { ParagraphPlugin, ReactPlugin } from '../plugins';
import { LateApiPlugin } from '../plugins/LateApiPlugin';
import { SlateReactNextPlugin } from '../plugins/SlateReactNextPlugin';
import { EventEditorPlugin } from '../plugins/event-editor/EventEditorPlugin';

export const getLateCorePlugins = () => [
  SlateReactNextPlugin,
  ReactPlugin,
  EventEditorPlugin,
  LateApiPlugin,
  ParagraphPlugin,
];
