import type { ElementType } from '@artibox/slate-common';
import type { Hotkey, Handlers, RenderElement } from '@artibox/slate-react';
import { BLOCKQUOTE_TYPE, BLOCKQUOTE_HOTKEY } from './constants';
import { BlockquoteController, createBlockquoteController } from './controller';
import { createBlockquoteHandlers } from './handlers';
import { defaultRenderBlockquote } from './render';
import { UseBlockquoteTool, createUseBlockquoteTool, createBlockquoteTool } from './tool';

export interface CreateBlockquoteConfig {
  hotkey?: Hotkey;
  type?: ElementType;
}

export interface Blockquote extends BlockquoteController {
  type: ElementType;
  createHandlers(hotkey: Hotkey): Handlers;
  defaultHandlers: Handlers;
  defaultRenderElement: RenderElement;
  useTool: UseBlockquoteTool;
  Tool: ReturnType<typeof createBlockquoteTool>;
}

export function createBlockquote(config?: CreateBlockquoteConfig): Blockquote {
  const { hotkey = BLOCKQUOTE_HOTKEY, type = BLOCKQUOTE_TYPE } = config || {};
  const controller = createBlockquoteController(type);
  const useTool = createUseBlockquoteTool(controller);

  return {
    type,
    ...controller,
    createHandlers: hotkey => createBlockquoteHandlers(controller, hotkey),
    defaultHandlers: createBlockquoteHandlers(controller, hotkey),
    defaultRenderElement: defaultRenderBlockquote,
    useTool,
    Tool: createBlockquoteTool(useTool)
  };
}
