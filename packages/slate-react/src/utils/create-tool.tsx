import React, { ReactNode } from 'react';
import { RenderToolProps } from '../typings/tool';

export interface ToolProps {
  children?: (props: RenderToolProps) => ReactNode;
}

export function createTool<P>(useTool: (props?: P) => RenderToolProps) {
  function Tool(props: ToolProps & P) {
    const { children } = props;
    const tool = useTool(props);

    if (!children) {
      return null;
    }

    return <>{children(tool)}</>;
  }

  return Tool;
}
