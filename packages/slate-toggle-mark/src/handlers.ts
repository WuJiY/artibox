import { isHotkey } from 'is-hotkey';
import type { Hotkey, Handlers } from '@artibox/slate-react';
import type { ToggleMarkController } from './controller';

export function createToggleMarkHandlers(controller: ToggleMarkController, hotkey: Hotkey): Handlers {
  const handlers: Handlers = editor => ({
    onKeyDown(event) {
      if (isHotkey(hotkey, event as any)) {
        controller.toggle(editor);
      }
    }
  });

  return handlers;
}
