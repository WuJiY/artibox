import React from 'react';
import { Slate } from 'slate-react';
import { ThemeProvider } from '@artibox/components/theme';
import { LocaleProvider } from '@artibox/components/locale';
import type { LocaleDefinition } from '@artibox/locale';

type SlateProps = Parameters<typeof Slate>[0];

export interface ArtiboxProps extends SlateProps {
  locale?: LocaleDefinition;
  theme?: string;
}

export function Artibox(props: ArtiboxProps) {
  const { children, locale, theme, ...rest } = props;

  return (
    <LocaleProvider locale={locale}>
      <ThemeProvider theme={theme}>
        <Slate {...rest}>{children}</Slate>
      </ThemeProvider>
    </LocaleProvider>
  );
}
