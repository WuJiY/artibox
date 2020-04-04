import type { MarkKey } from '@artibox/slate-common';
import type { RenderMark, Hotkey, Handlers } from '@artibox/slate-react';
import { ToggleMarkController, createToggleMarkController } from './controller';
import { createToggleMarkHandlers } from './handlers';
import { createRenderToggleMark } from './render';
import { UseToggleMarkTool, createUseToggleMarkTool, createToggleMarkTool } from './tool';

export interface CreateToggleMarkDefaultConfig {
  hotkey: Hotkey;
  key: MarkKey;
  render: RenderMark;
}

export type CreateToggleMarkConfig = Partial<CreateToggleMarkDefaultConfig>;

export interface ToggleMark extends ToggleMarkController {
  key: MarkKey;
  createHandlers(hotkey: Hotkey): Handlers;
  createRenderMark(render: RenderMark): RenderMark;
  defaultHandlers: Handlers;
  defaultRenderMark: RenderMark;
  useTool: UseToggleMarkTool;
  Tool: ReturnType<typeof createToggleMarkTool>;
}

export function createToggleMarkCreator(defaults: CreateToggleMarkDefaultConfig) {
  function createToggleMark(config?: CreateToggleMarkConfig): ToggleMark {
    const { hotkey = defaults.hotkey, key = defaults.key, render = defaults.render } = config || {};
    const controller = createToggleMarkController(key);
    const useTool = createUseToggleMarkTool(controller);

    return {
      ...controller,
      key,
      createRenderMark: render => createRenderToggleMark(render, key),
      createHandlers: hotkey => createToggleMarkHandlers(controller, hotkey),
      defaultRenderMark: createRenderToggleMark(render, key),
      defaultHandlers: createToggleMarkHandlers(controller, hotkey),
      useTool,
      Tool: createToggleMarkTool(useTool)
    };
  }

  return createToggleMark;
}
