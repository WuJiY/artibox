import React from 'react';
import { createToggleMarkCreator } from '@artibox/slate-toggle-mark';
import { UNDERLINE_KEY, UNDERLINE_HOTKEY } from './constants';

export const createUnderline = createToggleMarkCreator({
  hotkey: UNDERLINE_HOTKEY,
  key: UNDERLINE_KEY,
  render: ({ children }) => <u>{children}</u>
});
