import React from 'react';
import classNames from 'classnames';

export default function FaIcon({ icon, size }) {
  return <i className={classNames('fa', `fa-${icon}`, { [`fa-${size}x`]: size })} />;
}
