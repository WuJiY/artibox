import type { MarkKey } from '@artibox/slate-common';
import type { RenderMark } from '@artibox/slate-react';

export function createRenderToggleMark(render: RenderMark, key: MarkKey): RenderMark {
  const renderToggleMark: RenderMark = props => {
    if (props.leaf[key] !== true) {
      return props.children;
    }

    return render(props);
  };

  return renderToggleMark;
}
