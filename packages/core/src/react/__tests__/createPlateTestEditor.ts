import type { Value } from '@sewell_stephens/slate';
import type { RenderEditorReturnTuple } from 'slate-test-utils/dist/esm/buildTestHarness';

import { buildTestHarness } from 'slate-test-utils';

import type { AnyPluginConfig, InferPlugins } from '../../lib';

import { LateTest } from '../components/LateTest';
import {
  type CreateLateEditorOptions,
  type LateCorePlugin,
  type TLateEditor,
  createLateEditor,
} from '../editor';

/**
 * `buildTestHarness` where:
 *
 * - `Component`: `LateTest`
 * - `editor`: `createLateEditor`
 */
export const createLateTestEditor = async <
  V extends Value = Value,
  P extends AnyPluginConfig = LateCorePlugin,
>(
  options: CreateLateEditorOptions<V, P>,
  buildTestHarnessOptions?: Omit<
    Parameters<ReturnType<typeof buildTestHarness>>[0],
    'editor'
  >
): Promise<
  [
    TLateEditor<V, InferPlugins<P[]>>,
    RenderEditorReturnTuple[1],
    RenderEditorReturnTuple[2],
  ]
> => {
  return buildTestHarness(LateTest)({
    editor: createLateEditor(options),
    ...buildTestHarnessOptions,
  }) as any;
};
