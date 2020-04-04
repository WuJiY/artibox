import { Element } from 'slate';
import type { Node } from 'slate';
import type { ParagraphElement } from './typings/element';
import { PARAGRAPH_TYPE } from './constants/paragraph';

export const ArtiboxElement = {
  ...Element,
  isParagraphElement: (node: Node): node is ParagraphElement => Element.isElement(node) && node.type === PARAGRAPH_TYPE
};
