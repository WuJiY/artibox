import type { ReactNode } from 'react';
import type { Text } from 'slate';
import type { RenderLeafProps } from 'slate-react';

export interface RenderMarkProps<T extends Text = Text> extends Omit<RenderLeafProps, 'attributes'> {
  children: ReactNode;
  leaf: T;
  text: T;
}

export type RenderMark<T extends Text = Text> = (props: RenderMarkProps<T>) => ReactNode;
