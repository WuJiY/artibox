import { createEditor as createSlateEditor } from 'slate';
import { withReact } from 'slate-react';
import { withHistory } from 'slate-history';

export function createEditor() {
  return withHistory(withReact(createSlateEditor()));
}
