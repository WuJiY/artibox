import { Editor } from 'slate';

export const ArtiboxEditor = {
  ...Editor,
  selectionFragment(editor: Editor) {
    const { selection } = editor;
    return selection ? Editor.fragment(editor, selection) : null;
  }
};
