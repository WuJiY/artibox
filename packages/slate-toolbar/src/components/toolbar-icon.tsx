import React, { memo } from 'react';
import clsx from 'clsx';
import Icon from '@artibox/components/Icon';
import type { IconDefinition } from '@artibox/icons';
import type { RenderToolProps } from '@artibox/slate-react';

interface ToolbarIconProps extends RenderToolProps {
  icon: IconDefinition;
}

const ToolbarIcon = memo<ToolbarIconProps>(
  function ToolbarIcon({ active, onClick, icon }) {
    return (
      <span
        className={clsx('artibox-toolbar__icon', { ['artibox-toolbar__icon--active']: active })}
        onClick={onClick}
        onMouseDown={event => event.preventDefault()}
      >
        <Icon icon={icon} />
      </span>
    );
  },
  (prev, next) => prev.active === next.active && prev.onClick === next.onClick && prev.icon === next.icon
);

export default ToolbarIcon;
