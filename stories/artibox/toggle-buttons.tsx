import React from 'react';
import cx from 'classnames';

interface ToggleButtonsProps<T> {
  items: Array<{ value: T; label: string }>;
  value: T;
  onChange: (value: T) => void;
}

function ToggleButtons<T>({ items, value, onChange }: ToggleButtonsProps<T>) {
  return (
    <div className="artibox-editor-story__toggle-buttons">
      {items.map(item => (
        <button
          key={item.label}
          className={cx('artibox-editor-story__toggle-button', {
            'artibox-editor-story__toggle-button--active': item.value === value
          })}
          onClick={() => onChange(item.value)}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}

export default ToggleButtons;
