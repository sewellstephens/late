import type { AnyLatePlugin, LatePluginContext } from './LatePlugin';

export const omitPluginContext = <T extends LatePluginContext<AnyLatePlugin>>(
  ctx: T
) => {
  const {
    api,
    editor,
    getOption,
    getOptions,
    plugin,
    setOption,
    setOptions,
    tf,
    type,
    useOption,
    ...rest
  } = ctx;

  return rest;
};
