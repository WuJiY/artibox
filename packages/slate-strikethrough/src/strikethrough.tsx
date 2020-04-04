import React from 'react';
import { createToggleMarkCreator } from '@artibox/slate-toggle-mark';
import { STRIKETHROUGH_KEY, STRIKETHROUGH_HOTKEY } from './constants';

export const createStrikethrough = createToggleMarkCreator({
  hotkey: STRIKETHROUGH_HOTKEY,
  key: STRIKETHROUGH_KEY,
  render: ({ children }) => <del>{children}</del>
});
