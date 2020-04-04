import type { RenderMark } from '../typings/mark';

export function composeRenderMarks(renderMarks: RenderMark<any>[]): RenderMark {
  const composedRenderMarks: RenderMark = ({ children, leaf, text }) => {
    renderMarks.forEach(renderMark => {
      children = renderMark({ children, leaf, text });
    });

    return children;
  };

  return composedRenderMarks;
}
