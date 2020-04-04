import React from 'react';
import { Editable as SlateEditable, DefaultLeaf } from 'slate-react';
import type { EditableProps as SlateEditableProps } from 'slate-react/dist/components/editable';
import clsx from 'clsx';
import { useTheme } from '@artibox/components/theme';
import type { RenderMark } from '../typings/mark';
import '../styles';

export interface EditalbeProps extends SlateEditableProps {
  renderMark?: RenderMark;
}

export function Editable(props: EditalbeProps) {
  const { children, className, renderMark, renderLeaf, ...rest } = props;
  const themeName = useTheme();

  return (
    <SlateEditable
      className={clsx('artibox-editor', themeName, className)}
      renderLeaf={({ attributes, children, leaf, text }) => {
        const leafProps = {
          attributes,
          children: renderMark ? renderMark({ children, leaf, text }) : children,
          leaf,
          text
        };

        return renderLeaf ? renderLeaf(leafProps) : <DefaultLeaf {...leafProps} />;
      }}
      {...rest}
    >
      {children}
    </SlateEditable>
  );
}
