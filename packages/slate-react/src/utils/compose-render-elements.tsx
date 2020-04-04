import React from 'react';
import type { ElementType } from '@artibox/slate-common';
import { PARAGRAPH_TYPE } from '@artibox/slate-common/constants/paragraph';
import type { RenderElement } from '../typings/element';
import { DefaultElement } from 'slate-react';

export function composeRenderElements(renderElementsRecord: Record<ElementType, RenderElement>): RenderElement {
  renderElementsRecord = {
    [PARAGRAPH_TYPE]: props => <DefaultElement {...props} />,
    ...renderElementsRecord
  };

  const composedRenderElements: RenderElement = props => {
    const renderElement = renderElementsRecord[props.element.type];
    return renderElement && renderElement(props);
  };

  return composedRenderElements;
}
