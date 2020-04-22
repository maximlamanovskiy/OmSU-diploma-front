import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import OutsideArea from 'src/components/atoms/outsideArea/OutsideArea';

import './style.scss';

export default function SideMenu(props) {
  const { className, isOpen, outsideAreaEvent, children } = props;

  return (
    <React.Fragment>
      <aside
        className={classNames(`side-menu ${className}`, {
          'side-menu_close': !isOpen,
        })}
      >
        {children}
      </aside>
      <OutsideArea isOpen={isOpen} onClick={outsideAreaEvent} />
    </React.Fragment>
  );
}

SideMenu.propTypes = {
  className: PropTypes.string,
  isOpen: PropTypes.bool,
  outsideAreaEvent: PropTypes.func,
  children: PropTypes.node.isRequired,
};

SideMenu.defaultProps = {
  className: '',
  isOpen: false,
  outsideAreaEvent: () => {},
};
