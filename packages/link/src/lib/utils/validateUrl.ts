import { type SlateEditor, sanitizeUrl } from '@sewell_stephens/late-common';

import { LinkPlugin } from '../LinkPlugin';

export const validateUrl = (editor: SlateEditor, url: string): boolean => {
  const { allowedSchemes, dangerouslySkipSanitization, isUrl } =
    editor.getOptions(LinkPlugin);

  if (isUrl && !isUrl(url)) return false;
  if (
    !dangerouslySkipSanitization &&
    !sanitizeUrl(url, {
      allowedSchemes,
      permitInvalid: true,
    })
  )
    return false;

  return true;
};
