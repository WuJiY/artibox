import { Editor } from 'slate';
import type { MarkKey } from '@artibox/slate-common';

export interface ToggleMarkController {
  /**
   * Check if there are some marks matching the specific type in the current selection.
   */
  isSelectionIn(editor: Editor): boolean;
  /**
   * Add mark of the specific type on the current seleciton.
   */
  add(editor: Editor): void;
  /**
   * Remove marks matching the specific type in the current selection.
   */
  remove(editor: Editor): void;
  /**
   * Toggle marks matching the specific type in the current selection.
   */
  toggle(editor: Editor): void;
}

export function createToggleMarkController(key: MarkKey) {
  const isSelectionIn: ToggleMarkController['isSelectionIn'] = editor => {
    const marks = Editor.marks(editor);
    return marks ? marks[key] === true : false;
  };
  const add: ToggleMarkController['add'] = editor => Editor.addMark(editor, key, true);
  const remove: ToggleMarkController['remove'] = editor => Editor.removeMark(editor, key);
  const toggle: ToggleMarkController['toggle'] = editor => (isSelectionIn(editor) ? remove : add)(editor);

  return {
    isSelectionIn,
    add,
    remove,
    toggle
  };
}
