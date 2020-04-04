import type { Element } from 'slate';
import type { PARAGRAPH_TYPE } from '../constants/paragraph';

export type ElementType = string;

export interface ParagraphElement extends Element {
  type: PARAGRAPH_TYPE;
}
