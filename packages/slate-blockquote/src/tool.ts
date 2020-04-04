import { useCallback } from 'react';
import { useSlate } from 'slate-react';
import type { RenderToolProps } from '@artibox/slate-react';
import { createTool } from '@artibox/slate-react/utils/create-tool';
import type { BlockquoteController } from './controller';

export type BlockquoteToolCommand = 'wrap' | 'unwrap' | 'toggle';

export interface UseBlockquoteToolConfig {
  command?: BlockquoteToolCommand;
  disableActive?: boolean;
}

export type UseBlockquoteTool = (config?: UseBlockquoteToolConfig) => RenderToolProps;

export function createUseBlockquoteTool(controller: BlockquoteController) {
  const useBlockquoteTool: UseBlockquoteTool = (config = {}) => {
    const { command = 'toggle', disableActive } = config || {};
    const editor = useSlate();
    const active = !disableActive && controller.isSelectionIn(editor);
    const onClick = useCallback(() => controller[command](editor), [controller, command, editor]);

    return {
      active,
      onClick
    };
  };

  return useBlockquoteTool;
}

export function createBlockquoteTool(useBlockquoteTool: UseBlockquoteTool) {
  return createTool(useBlockquoteTool);
}
