import React, { useRef, useLayoutEffect, useState, ReactNode } from 'react';
import { Range, Editor } from 'slate';
import { useSlate, ReactEditor } from 'slate-react';
import clsx from 'clsx';
import { ElementType } from '@artibox/slate-common';
import type { InputConfig } from '@artibox/slate-react';
import { useTheme } from '@artibox/components/theme';
import Portal from '@artibox/components/Portal';
import ToolbarInput from './toolbar-input';
import '../styles';

function roundNumber(value: number, min: number, max: number) {
  if (value < min) {
    return min;
  } else if (value > max) {
    return max;
  }

  return value;
}

/**
 * @todo
 * Also round top.
 */
function calculatePosition(el: HTMLElement) {
  const native = window.getSelection();
  const range = native!.getRangeAt(0);
  const rect = range.getBoundingClientRect();
  const top = rect.top + window.pageYOffset - el.offsetHeight;
  const left = roundNumber(
    rect.left + window.pageXOffset - (el.offsetWidth - rect.width) / 2,
    0,
    window.innerWidth - el.offsetWidth
  );

  return { top, left };
}

interface ToolbarInnerProps {
  editor: ReactEditor;
  renderCollapsed?: () => ReactNode;
  renderExpanded?: () => ReactNode;
  selection: Range;
}

function ToolbarInner({ editor, renderCollapsed, renderExpanded, selection }: ToolbarInnerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const theme = useTheme();
  const [toolInput, setToolInput] = useState<InputConfig | undefined>();
  const focusTextEmpty = Editor.string(editor, selection) === '';
  /**
   * If the tool input process start, the editor will be blurred so that toolbar will hide.
   * To avoid this issue, add `|| toolInput` to the condition.
   */
  const isExpanded = !!(renderExpanded && !focusTextEmpty && (toolInput || Range.isExpanded(selection)));
  const isCollapsed = !!(renderCollapsed && (toolInput || !isExpanded));
  let render: (() => ReactNode) | undefined;

  if (isExpanded) {
    render = renderExpanded;
  } else if (isCollapsed) {
    render = renderCollapsed;
  }

  useLayoutEffect(() => {
    if (!ReactEditor.isFocused(editor) || toolInput) {
      return;
    }

    function handler() {
      const el = ref.current;

      if (!el) {
        return;
      }

      const { top, left } = calculatePosition(el);

      el.style.top = `${top}px`;
      el.style.left = `${left}px`;
    }

    /**
     * While this effect fired, the native selection is not synchronized to the latest.
     * To avoid the issue, we just invoke the handler on next frame.
     */
    window.requestAnimationFrame(handler);
  });

  if (!render) {
    return null;
  }

  return (
    <Portal>
      <div ref={ref} className={clsx('artibox-toolbar__wrapper', theme)} onMouseDown={event => event.preventDefault()}>
        <div className="artibox-toolbar__arrow" />
        <div className="artibox-toolbar">
          {render()}
          {toolInput && <ToolbarInput editor={editor} toolInput={toolInput} setToolInput={setToolInput} />}
        </div>
      </div>
    </Portal>
  );
}

export interface ToolbarProps extends Omit<ToolbarInnerProps, 'editor' | 'selection'> {
  /**
   * The blacklist of elements.
   * If some elements in the current selection are in the blacklist, toolbar will be hided.
   */
  disabledElement?: ElementType[];
}

function Toolbar(props: ToolbarProps) {
  const { disabledElement, renderCollapsed, renderExpanded } = props;
  const editor = useSlate();
  const { selection } = editor;

  if (
    !selection ||
    (disabledElement &&
      Editor.fragment(editor, selection).some(
        descendant => 'children' in descendant && disabledElement.includes(descendant.type)
      ))
  ) {
    return null;
  }

  return (
    <ToolbarInner
      editor={editor}
      renderCollapsed={renderCollapsed}
      renderExpanded={renderExpanded}
      selection={selection}
    />
  );
}

export default Toolbar;
