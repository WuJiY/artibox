import type { DOMAttributes } from 'react';
import type { ReactEditor } from 'slate-react';

export type DomHandlers = Omit<DOMAttributes<HTMLDivElement>, 'children' | 'dangerouslySetInnerHTML'>;

export type Handlers<T extends ReactEditor = ReactEditor> = (editor: T) => DomHandlers;
