'use client';

import React from 'react';
import { withRef } from '@sewellstephens/cn';
import { PlateElement } from '@sewellstephens/plate-common';

export const CodeLineElement = withRef<typeof PlateElement>((props, ref) => (
  <PlateElement ref={ref} {...props} />
));
