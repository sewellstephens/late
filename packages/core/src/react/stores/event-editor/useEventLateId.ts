import { useEventEditorSelectors } from '../../plugins/event-editor/EventEditorStore';
import { PLATE_SCOPE, useLateSelectors } from '../plate';

/** Get last event editor id: focus, blur or last. */
export const useEventLateId = (id?: string) => {
  const focus = useEventEditorSelectors.focus();
  const blur = useEventEditorSelectors.blur();
  const last = useEventEditorSelectors.last();
  const providerId = useLateSelectors().editor().id;

  if (id) return id;
  if (focus) return focus;
  if (blur) return blur;

  return last ?? providerId ?? PLATE_SCOPE;
};
