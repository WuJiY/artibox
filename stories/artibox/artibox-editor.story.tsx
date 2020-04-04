import '@artibox/theme/artibox';

import React, { useState, useMemo } from 'react';
import type { Node } from 'slate';
import {
  Bold as BoldIcon,
  Italic as ItalicIcon,
  Underline as UnderlineIcon,
  Strikethrough as StrikethroughIcon,
  Highlight as HighlightIcon,
  Blockquote as BlockquoteIcon
} from '@artibox/icons';
import {
  // composePlugins,
  composeRenderElements,
  composeRenderMarks,
  composeHandlers,
  createEditor,
  Artibox,
  Editable
} from '@artibox/slate-react';
import { Toolbar, ToolbarIcon } from '@artibox/slate-toolbar';
import { createBold } from '@artibox/slate-bold';
import { createItalic } from '@artibox/slate-italic';
import { createUnderline } from '@artibox/slate-underline';
import { createStrikethrough } from '@artibox/slate-strikethrough';
import { createHighlight } from '@artibox/slate-highlight';
import { createBlockquote } from '@artibox/slate-blockquote';

const Bold = createBold();
const Italic = createItalic();
const Underline = createUnderline();
const Strikethrough = createStrikethrough();
const Highlight = createHighlight();
const Blockquote = createBlockquote();

const renderElement = composeRenderElements({
  [Blockquote.type]: Blockquote.defaultRenderElement
});
const renderMark = composeRenderMarks([
  Bold.defaultRenderMark,
  Italic.defaultRenderMark,
  Underline.defaultRenderMark,
  Strikethrough.defaultRenderMark,
  Highlight.defaultRenderMark
]);
const composedHandlers = composeHandlers([
  Bold.defaultHandlers,
  Italic.defaultHandlers,
  Underline.defaultHandlers,
  Strikethrough.defaultHandlers,
  Highlight.defaultHandlers,
  Blockquote.defaultHandlers
]);

export function ArtiboxEditorStory() {
  const editor = useMemo(() => createEditor(), []);
  const handlers = useMemo(() => composedHandlers(editor), [editor]);
  const [value, setValue] = useState<Node[]>([
    {
      type: 'paragraph',
      children: [{ text: 'A line of text in a paragraph.' }]
    }
  ]);

  return (
    <Artibox editor={editor} value={value} onChange={setValue}>
      <Toolbar
        renderCollapsed={() => (
          <>
            <Blockquote.Tool>{props => <ToolbarIcon icon={BlockquoteIcon} {...props} />}</Blockquote.Tool>
          </>
        )}
        renderExpanded={() => (
          <>
            <Bold.Tool>{props => <ToolbarIcon icon={BoldIcon} {...props} />}</Bold.Tool>
            <Italic.Tool>{props => <ToolbarIcon icon={ItalicIcon} {...props} />}</Italic.Tool>
            <Underline.Tool>{props => <ToolbarIcon icon={UnderlineIcon} {...props} />}</Underline.Tool>
            <Strikethrough.Tool>{props => <ToolbarIcon icon={StrikethroughIcon} {...props} />}</Strikethrough.Tool>
            <Highlight.Tool>{props => <ToolbarIcon icon={HighlightIcon} {...props} />}</Highlight.Tool>
          </>
        )}
      />
      <Editable
        className="artibox-stories-elements artibox-editor-story"
        renderElement={renderElement}
        renderMark={renderMark}
        {...handlers}
      />
    </Artibox>
  );
}

ArtiboxEditorStory.story = {
  name: 'Artibox Editor'
};
