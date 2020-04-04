import type { Editor } from 'slate';
import type { Plugin } from '../typings/plugin';

export function composePlugins<T extends Editor, P extends (editor: Editor) => any>(
  plugins: P[]
): P extends (editor: Editor) => T & infer R ? Plugin<T, R> : never {
  function composedPlugin(editor: Editor) {
    plugins.forEach(plugin => {
      editor = plugin(editor);
    });

    return editor;
  }

  return composedPlugin as any;
}
