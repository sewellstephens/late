import { createAtomStore } from '@sewell_stephens/late-common/react';

type Progresses = Record<string, number>;
interface PlaceholderStore {
  isUploading: boolean;
  progresses: Progresses;
  updatedFiles: File[];
}

export const { PlaceholderProvider, placeholderStore, usePlaceholderStore } =
  createAtomStore(
    {
      isUploading: false,
      progresses: {},
      updatedFiles: [],
    } as PlaceholderStore,
    { name: 'placeholder' }
  );
