import '@artibox/theme/artibox.scss';
import React, { useState, useCallback, useMemo } from 'react';
import { OnChangeFn } from 'slate-react';
import { createArtiboxEditor } from '@artibox/slate-editor';
import { plugins } from './plugins';
import { initialValue } from './value';
import { jsxSerializer } from './jsx-serializer';

const ArtiboxEditor = createArtiboxEditor({ plugins, defaultBlockComponent: 'p' });

export function JsxSerializerStory() {
  const [value, setValue] = useState(initialValue);
  const onChange = useCallback<OnChangeFn>(change => setValue(change.value), []);
  const jsx = useMemo(() => jsxSerializer(value.toJSON()), [value.document]);

  return (
    <div className="artibox-theme-artibox jsx-serializer-story">
      <ArtiboxEditor
        className="artibox-stories-elements jsx-serializer-story__section"
        value={value}
        onChange={onChange}
      />
      <div className="artibox-stories-elements artibox-theme-artibox jsx-serializer-story__section">{jsx}</div>
    </div>
  );
}

JsxSerializerStory.story = {
  name: 'Jsx Serializer'
};
