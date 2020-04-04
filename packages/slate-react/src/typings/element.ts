import type { Element } from 'slate';
import type { RenderElementProps as SlateReactRenderElementProps } from 'slate-react';

export interface RenderElementProps<E extends Element = Element> extends SlateReactRenderElementProps {
  element: E;
}

export type RenderElement<E extends Element = Element> = (props: RenderElementProps<E>) => JSX.Element;
