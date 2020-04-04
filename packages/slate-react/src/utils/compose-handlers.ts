import type { ReactEditor } from 'slate-react';
import type { Handlers, DomHandlers } from '../typings/handler';

export function composeHandlers(handlersList: Handlers[]): Handlers {
  function composedHandlers(editor: ReactEditor) {
    const composedHandlers: DomHandlers = {};

    handlersList.forEach(handlers => {
      const domHandlers = handlers(editor);

      for (const eventName in domHandlers) {
        const domHandler = domHandlers[eventName as keyof DomHandlers];

        if (domHandler) {
          const composedHandler = composedHandlers[eventName as keyof DomHandlers];

          composedHandlers[eventName as keyof DomHandlers] = (composedHandler
            ? (event: any) => {
                composedHandler(event);
                domHandler(event);
              }
            : domHandler) as any;
        }
      }
    });

    return composedHandlers;
  }

  return composedHandlers;
}
