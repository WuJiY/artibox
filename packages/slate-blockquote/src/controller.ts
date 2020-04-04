import { Node, Element, Editor, Transforms } from 'slate';
import type { ElementType } from '@artibox/slate-common';
import { ArtiboxEditor } from '@artibox/slate-common/editor';
import type { BlockquoteElement } from './typings';

export interface BlockquoteController {
  /**
   * Check if the elment is blockquote.
   */
  isNodeAs(node?: Node | null): node is Element;
  /**
   * Check if the current selection is in blockquote.
   */
  isSelectionIn(editor: Editor): boolean;
  /**
   * Get the closest element which is blockquote, or null.
   */
  getClosest(editor: Editor): Element | null;
  /**
   * Wrap paragraph elements in selection with blockquote elment.
   */
  wrap(editor: Editor): void;
  /**
   * Unwrap the closest blockquote elment if there is.
   */
  unwrap(editor: Editor): void;
  /**
   * Unwrap paragraph elements in selection.
   */
  unwrapOnlySelection(editor: Editor): void;
  /**
   * To toggle the blockquote elment.
   */
  toggle(editor: Editor): void;
}

export function createBlockquoteController(type: ElementType): BlockquoteController {
  const isNodeAs: BlockquoteController['isNodeAs'] = (node?: Node | null): node is Element =>
    node ? Element.isElement(node) && node.type === type : false;
  const getClosest: BlockquoteController['getClosest'] = editor => {
    const { selection } = editor;

    if (!selection) {
      return null;
    }

    const nodeEntry = Editor.above(editor, {
      match: isNodeAs,
      mode: 'lowest'
    });

    return nodeEntry ? nodeEntry[0] : null;
  };
  const isSelectionIn: BlockquoteController['isSelectionIn'] = editor => !!getClosest(editor);
  const wrap: BlockquoteController['wrap'] = editor => {
    const children = ArtiboxEditor.selectionFragment(editor);

    if (children) {
      const element: BlockquoteElement = { type, children };

      Transforms.wrapNodes(editor, element, {
        mode: 'lowest'
      });
    }
  };
  const unwrapBase = (editor: Editor, split: boolean) => {
    const { selection } = editor;

    if (selection) {
      Transforms.unwrapNodes(editor, {
        match: isNodeAs,
        mode: 'lowest',
        split
      });
    }
  };
  const unwrap: BlockquoteController['unwrap'] = editor => unwrapBase(editor, false);
  const unwrapOnlySelection: BlockquoteController['unwrapOnlySelection'] = editor => unwrapBase(editor, true);
  const toggle: BlockquoteController['toggle'] = editor => (isSelectionIn(editor) ? unwrap : wrap)(editor);

  return {
    isNodeAs,
    isSelectionIn,
    getClosest,
    wrap,
    unwrap,
    unwrapOnlySelection,
    toggle
  };
}
