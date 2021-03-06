import React from 'react';
import { RenderBlockProps, RenderAttributes, Plugin } from 'slate-react';
import { CreateCommonRendererConfig, NodeIsVoid } from '../typings/renderer';

export type CreateCommonBlockRendererConfig<P extends RenderAttributes = RenderAttributes> = CreateCommonRendererConfig<
  RenderBlockProps,
  P
> &
  NodeIsVoid;

/**
 * Create the render methods for common block.
 */
export function createCommonBlockRenderer<P extends RenderAttributes = RenderAttributes>(
  config: CreateCommonBlockRendererConfig<P>
): Plugin {
  const { type, component, getProps, isVoid = false } = config;
  const Component = component as any;

  return {
    renderBlock(props, editor, next) {
      if (props.node.type !== type) {
        return next();
      }

      const { children, attributes } = props;
      const data = getProps?.(props, editor);

      return (
        <Component {...attributes} {...data}>
          {isVoid ? undefined : children}
        </Component>
      );
    }
  };
}
