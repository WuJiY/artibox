import type { MouseEventHandler, FC, ReactNode } from 'react';

export interface RenderToolProps {
  active?: boolean;
  onClick: MouseEventHandler;
}

export type Tool<P = {}> = FC<
  P & {
    children?: (props: RenderToolProps) => ReactNode;
  }
>;
