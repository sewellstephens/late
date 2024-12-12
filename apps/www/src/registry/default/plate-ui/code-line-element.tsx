'use client';

import React from 'react';

import { withRef } from '@sewellstephens/cn';
import { PlateElement } from '@sewellstephens/plate-common/react';

export const CodeLineElement = withRef<typeof PlateElement>((props, ref) => (
  <PlateElement ref={ref} {...props} />
));
