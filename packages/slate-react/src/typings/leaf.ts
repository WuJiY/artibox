import type { Text } from 'slate';
import type { RenderLeafProps as SlateReactRenderLeafProps } from 'slate-react';

export interface RenderLeafProps<T extends Text = Text> extends SlateReactRenderLeafProps {
  leaf: T;
  text: T;
}

export type RenderLeaf<T extends Text = Text> = (props: RenderLeafProps<T>) => JSX.Element;
