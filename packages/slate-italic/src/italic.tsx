import React from 'react';
import { createToggleMarkCreator } from '@artibox/slate-toggle-mark';
import { ITALIC_KEY, ITALIC_HOTKEY } from './constants';

export const createItalic = createToggleMarkCreator({
  hotkey: ITALIC_HOTKEY,
  key: ITALIC_KEY,
  render: ({ children }) => <i>{children}</i>
});
