import React, { memo } from 'react';

const ToolbarDivider = memo(
  function ToolbarDivider() {
    return <span className="artibox-toolbar__divider" />;
  },
  () => true
);

export default ToolbarDivider;
