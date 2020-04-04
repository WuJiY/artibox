import React, { KeyboardEventHandler, KeyboardEvent, MouseEvent } from 'react';
import type { ReactEditor } from 'slate-react';
import { useLocale } from '@artibox/components/locale';
import type { InputConfig, SetInputConfig } from '@artibox/slate-react';

export interface ToolbarInputProps {
  editor: ReactEditor;
  toolInput: InputConfig;
  setToolInput: SetInputConfig;
}

function ToolbarInput({ editor, toolInput, setToolInput }: ToolbarInputProps) {
  /**
   * Auto focus on mount.
   */
  const ref = (input: HTMLInputElement) => {
    if (input) {
      input.focus();
    }
  };
  const onExitInputAndFocus = (event: KeyboardEvent | MouseEvent) => {
    event.preventDefault();
    setToolInput(undefined);
    editor.focus();
  };
  const onKeyDown: KeyboardEventHandler = event => {
    if (!toolInput) {
      return;
    }

    const { onConfirm } = toolInput;

    if (event.key === 'Enter') {
      onConfirm(editor, (event.target as HTMLInputElement).value);
      onExitInputAndFocus(event);
    } else if (event.key === 'Escape') {
      onExitInputAndFocus(event);
    }
  };
  /**
   * Won't invoke `editor.focus()` since the native selection will be lost.
   */
  const onBlur = () => setToolInput(undefined);
  const { getPlaceholder } = toolInput;
  const locale = useLocale();
  const placeholder = getPlaceholder(locale);

  return (
    <div className="artibox-toolbar__input__wrapper">
      <input
        ref={ref}
        className="artibox-toolbar__input"
        placeholder={placeholder}
        onKeyDown={onKeyDown}
        onBlur={onBlur}
      />
      <svg className="artibox-toolbar__input__cross" viewBox="0 0 320 512" onMouseDown={onExitInputAndFocus}>
        <path d="M193.94 256L296.5 153.44l21.15-21.15c3.12-3.12 3.12-8.19 0-11.31l-22.63-22.63c-3.12-3.12-8.19-3.12-11.31 0L160 222.06 36.29 98.34c-3.12-3.12-8.19-3.12-11.31 0L2.34 120.97c-3.12 3.12-3.12 8.19 0 11.31L126.06 256 2.34 379.71c-3.12 3.12-3.12 8.19 0 11.31l22.63 22.63c3.12 3.12 8.19 3.12 11.31 0L160 289.94 262.56 392.5l21.15 21.15c3.12 3.12 8.19 3.12 11.31 0l22.63-22.63c3.12-3.12 3.12-8.19 0-11.31L193.94 256z" />
      </svg>
    </div>
  );
}

export default ToolbarInput;
