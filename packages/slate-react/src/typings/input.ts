import type { ReactEditor } from 'slate-react';
import type { Dispatch, SetStateAction } from 'react';
import type { LocaleDefinition } from '@artibox/locale';

/**
 * The minimum configuration of input for link, embed, ...etc.
 */
export type InputConfig<T extends ReactEditor = ReactEditor> = {
  getPlaceholder: (locale: LocaleDefinition) => string;
  onConfirm: (editor: T, value: string) => void;
};

export type SetInputConfig = Dispatch<SetStateAction<InputConfig | undefined>>;
