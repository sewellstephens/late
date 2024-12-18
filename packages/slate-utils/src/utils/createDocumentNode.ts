import type { TDescendant } from '@sewell_stephens/slate';

export const createDocumentNode = (
  type = 'p',
  text = '',
  remaining: TDescendant[] = []
): TDescendant[] => [
  {
    children: [
      {
        children: [{ text }],
        type,
      },
      ...remaining,
    ],
  } as any,
];
