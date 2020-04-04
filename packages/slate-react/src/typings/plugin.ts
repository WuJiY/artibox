import type { Editor } from 'slate';

export type Plugin<T extends Editor, R> = (editor: T) => T & R;
