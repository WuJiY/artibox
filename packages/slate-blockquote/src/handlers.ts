import { Transforms, Node, Range, Editor } from 'slate';
import { isHotkey } from 'is-hotkey';
//import { PARAGRAPH_TYPE } from '@artibox/slate-common/constants/paragraph';
import { ArtiboxElement } from '@artibox/slate-common/element';
import type { Hotkey, Handlers, DomHandlers } from '@artibox/slate-react';
import type { BlockquoteController } from './controller';

export function createBlockquoteHandlers(controller: BlockquoteController, hotkey: Hotkey): Handlers {
  const handlers: Handlers = editor => {
    /**
     * The handler of soft break.
     */
    const onSoftBreak: DomHandlers['onKeyDown'] = event => {
      const blockquoteElement = controller.getClosest(editor);

      if (blockquoteElement) {
        event.preventDefault();
        Transforms.splitNodes(editor, {
          match: ArtiboxElement.isParagraphElement,
          mode: 'highest',
          always: true
        });
      }
    };

    /**
     * If the focused block inside blockquote is w/o any texts, unwrap the focused block.
     */
    const onEnter: DomHandlers['onKeyDown'] = event => {
      const { selection } = editor;
      const blockquoteElement = controller.getClosest(editor);

      if (blockquoteElement && selection) {
        const [node] = Editor.first(editor, selection);

        if (!Node.string(node).length) {
          event.preventDefault();
          controller.unwrapOnlySelection(editor);
        }
      }
    };

    /**
     * If the focused block inside blockquote and the selection is not expanded, unwrap the focused block.
     */
    const onBackSpace: DomHandlers['onKeyDown'] = event => {
      const { selection } = editor;

      if (
        controller.isSelectionIn(editor) &&
        selection &&
        Range.isCollapsed(selection) &&
        selection.focus.offset === 0
      ) {
        event.preventDefault();
        controller.unwrapOnlySelection(editor);
      }
    };

    return {
      onKeyDown(event) {
        if (event.key === 'Enter') {
          (event.shiftKey ? onSoftBreak : onEnter)(event);
        } else if (event.key === 'Backspace') {
          onBackSpace(event);
        } else if (isHotkey(hotkey, event as any)) {
          controller.toggle(editor);
        }
      }
    };
  };

  return handlers;
}
