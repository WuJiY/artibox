import { useCallback } from 'react';
import { useSlate } from 'slate-react';
import type { RenderToolProps } from '@artibox/slate-react';
import { createTool } from '@artibox/slate-react/utils/create-tool';
import type { ToggleMarkController } from './controller';

export type ToggleMarkToolCommand = Exclude<keyof ToggleMarkController, 'isSelectionIn'>;

export interface UseToggleMarkToolConfig {
  command?: ToggleMarkToolCommand;
}

export type UseToggleMarkTool = (config?: UseToggleMarkToolConfig) => RenderToolProps;

export function createUseToggleMarkTool(controller: ToggleMarkController) {
  const useToggleMarkTool: UseToggleMarkTool = config => {
    const { command = 'toggle' } = config || {};
    const editor = useSlate();
    const active = controller.isSelectionIn(editor);
    const onClick = useCallback(() => controller[command](editor), [controller, command, editor]);

    return {
      active,
      onClick
    };
  };

  return useToggleMarkTool;
}

export function createToggleMarkTool(useToggleMarkTool: UseToggleMarkTool) {
  return createTool(useToggleMarkTool);
}
