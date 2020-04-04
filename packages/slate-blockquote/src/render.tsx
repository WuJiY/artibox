import React from 'react';
import type { RenderElementProps } from 'slate-react';

export type RenderBlockquoteProps = Pick<RenderElementProps, 'attributes' | 'children'>;

export type RenderBlockquote = (props: RenderBlockquoteProps) => JSX.Element;

export const defaultRenderBlockquote: RenderBlockquote = ({ attributes, children }) => (
  <blockquote {...attributes}>{children}</blockquote>
);
