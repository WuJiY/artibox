import React from 'react';
import { createToggleMarkCreator } from '@artibox/slate-toggle-mark';
import { BOLD_KEY, BOLD_HOTKEY } from './constants';

export const createBold = createToggleMarkCreator({
  hotkey: BOLD_HOTKEY,
  key: BOLD_KEY,
  render: ({ children }) => <strong>{children}</strong>
});
