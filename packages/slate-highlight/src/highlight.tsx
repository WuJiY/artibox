import React from 'react';
import { createToggleMarkCreator } from '@artibox/slate-toggle-mark';
import { HIGHLIGHT_KEY, HIGHLIGHT_HOTKEY } from './constants';

export const createHighlight = createToggleMarkCreator({
  hotkey: HIGHLIGHT_HOTKEY,
  key: HIGHLIGHT_KEY,
  render: ({ children }) => <mark>{children}</mark>
});
